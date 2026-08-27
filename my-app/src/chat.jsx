import { useState } from "react";
import './chatstyle.css';

function ChatBot() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleSend = () => {
        if (message.trim() === "") return;

        const userMsg = { sender: "User", text: message };
        const aiMsg = { sender: "AI", text: "This is a placeholder reply." };

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