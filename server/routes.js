const express = require("express");
const router = express.Router();
const { runsConnection } = require('./mongo/db.js');
const splitModel = require('./mongo/schema/splitschema.js');
const messageModel = require('./mongo/schema/messages.js');
const usernameModel = require('./mongo/schema/username.js');
const chatbot = require('./chatbot.js');
const bcrypt = require('bcrypt');


router.put("/runs/:existingRunId", async (req, res) => {
    try {
        const updatedRun = await splitModel.findByIdAndUpdate(req.params.existingRunId, req.body, { returnDocument: 'after' });
        if (!updatedRun) {
            return res.status(404).json({ error: "Run not found" });
        }
        res.json(updatedRun);
    } catch (err) {
        res.status(500).json({ error: "Failed to update run" });
    }
});

router.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log(userMessage);
    const aiResponse = await chatbot.getChatResponse(userMessage);
    const mess = await messageModel.create({
        aiMessage: aiResponse,
        humanMessage: userMessage,
        userId: req.body.userId
    });
    await mess.save();
    res.json({ aiResponse });
});

router.post("/run", async (req, res) => {
    try {
        const data = await splitModel.create(req.body);

        res.status(201).json(data);
    } catch (err) {
        console.error("ERROR CREATING RUN:", err);

        res.status(500).json({
            error: err.message
        });
    }
});
router.post("/userdata", async (req, res) => {
    try {
        const data = await splitModel.find({ userId: req.body.userId });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usernameModel.findOne({ userName: username });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid username or password" });
            }
            return res.status(200).json({ id: user._id, username: user.userName });
        }
        else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to login" });
    }
});

// router.post("/signup", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await usernameModel.create({ userName: username, password: hashedPassword });

//         if (user) {
//             return res.status(200).json({ id: user._id, username: user.userName });
//         }
//         else {
//             return res.status(401).json({ message: "Invalid username or password" });
//         }
//     } catch (err) {
//         res.status(500).json({ error: "Failed to signup" });
//     }
// });
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("USERNAME:", username);
        console.log("PASSWORD RECEIVED:", !!password);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await usernameModel.create({
            userName: username,
            password: hashedPassword
        });

        console.log("USER CREATED:", user);

        return res.status(200).json({
            id: user._id,
            username: user.userName
        });

    } catch (err) {
        console.error( err);

        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;