const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const axios = require('axios');
const app = express();
const splitModel = require('./mongo/schema/splitschema.js');
const runs = require('./routes.js');
const chatbot = require('./chatbot.js');
const runsConnection = require('./mongo/db.js');
const messageModel = require('./mongo/schema/messages.js');


app.use(express.json());
app.use(cors());

app.use('', runs);
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});