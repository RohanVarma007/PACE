const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const splitModel = require('./splitschema.js');
const runs = require('./routes.js');
const chatbot = require('./chatbot.js');

app.use(express.json());
app.use(cors());

app.use('/api/runs', runs);
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log(userMessage);
    const aiResponse = await chatbot.getChatResponse(userMessage);
    console.log(aiResponse);
    res.json({aiResponse});
});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});