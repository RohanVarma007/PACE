const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const gemi = new GoogleGenerativeAI(process.env.gemini_api_key);

async function getChatResponse(message){
    try{
        const model = gemi.getGenerativeModel({ model: "gemini-3.6-flash" });
        const result = await model.generateContent(message);
        return result.response.text();
    } catch (error) {
        console.error("Error fetching chat response:", error);
        return "Sorry, I encountered an error.";
    }
}
module.exports = { getChatResponse };