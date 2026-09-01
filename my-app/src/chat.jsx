import { useState } from "react";
import './chatstyle.css';
//chatbot component with like neat formatting and ai replies
function ChatBot() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleSend = async () => {
        if (message.trim() === "") return;

        const userMsg = { sender: "User", text: message };
        const ai = async () => {
            try {
                const response = await fetch("http://localhost:5000/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message: userMsg.text })
                });
                const data = await response.json();
                return data.aiResponse;
            } catch (error) {
                console.error("Error fetching AI response:", error);
                return "Sorry, I encountered an error.";
            }
        };
        const aiMsg = { sender: "AI", text: await ai() };

        setChatHistory([...chatHistory, userMsg, aiMsg]);
        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatmessage">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-message ${chat.sender.toLowerCase()}`}>
                        {chat.text}
                    </div>
                ))}
            </div>

            <div className="chat-input-row">
                <textarea
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatBot;