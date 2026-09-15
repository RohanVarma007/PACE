const express = require("express");
const router = express.Router();
const { runsConnection } = require('./mongo/db.js');
const splitModel = require('./mongo/schema/splitschema.js');
const messageModel = require('./mongo/schema/messages.js');
const usernameModel = require('./mongo/schema/username.js');
const coachModel = require('./mongo/schema/coach.js');
const chatbot = require('./chatbot.js');
const bcrypt = require('bcrypt');
const getChatResponse = require('./chatbot.js');

router.get("/run/:runId", async (req, res) => {
    try {
        const runId = req.params.runId;
        console.log("Fetching run with ID:", runId);

        const runData = await splitModel.findById(runId);
        console.log("Run data found:", runData);

        if (!runData) {
            return res.status(404).json({ error: "Run not found", runId });
        }
        res.json(runData);
    } catch (err) {
        console.error("Error fetching run:", err);
        res.status(500).json({ error: "Failed to fetch run data", details: err.message });
    }
});

router.post("/coach", async (req, res) => {
    try {
        const COACH_SYSTEM_PROMPT = `You are a supportive, knowledgeable running coach helping a beginner runner improve safely.

        Your priorities, in order:
        1. Injury prevention — never suggest sudden jumps in distance, pace, or frequency. Follow the 10% rule (don't increase weekly mileage by more than ~10% week to week).
        2. Sustainable, gradual progress over quick results.
        3. Practical, specific feedback based on the run data given to you (splits, pace, distance, duration) — not generic advice.

        When responding:
        - Keep it encouraging but honest — call out real issues (e.g. going out too fast, uneven splits) without being harsh.
        - Give ONE or TWO concrete, actionable suggestions per response, not a long list.
        - If the data suggests overtraining, poor pacing, or risk of injury, say so clearly and recommend rest or an easier session.
        - Avoid jargon — explain things simply, as if talking to someone new to running.
        - Never suggest specific training plans beyond general pacing/frequency guidance — you're a supportive coach, not a replacement for a certified trainer or doctor.

        Keep responses short — 3-5 sentences unless the user asks for more detail.`;
        console.log("Received suggestions:");
        const contextPrompt = `${COACH_SYSTEM_PROMPT}\n\n${JSON.stringify(req.body.runData)}`;
        const suggestions = await getChatResponse(contextPrompt);
        const coach = await coachModel.create({ ...req.body, suggestions });
        res.status(201).json(coach);
    } catch (err) {
    console.log("BACKEND ERROR:", err.response?.data);
    return res.status(500).json({ error: err.message });
}
});

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

// router.post('/chat', async (req, res) => {
//     const userMessage = req.body.message;
//     console.log(userMessage);
//     const aiResponse = await chatbot.getChatResponse(userMessage);
//     const mess = await messageModel.create({
//         aiMessage: aiResponse,
//         humanMessage: userMessage,
//         userId: req.body.userId
//     });
//     await mess.save();
//     res.json({ aiResponse });
// });
router.post('/chat', async (req, res) => {
    try {
        console.log("1. CHAT ROUTE REACHED");

        const userMessage = req.body.message;
        console.log("2. User message:", userMessage);

        const aiResponse = await chatbot.getChatResponse(userMessage);
        console.log("3. AI response:", aiResponse);

        res.json({ aiResponse });

    } catch (error) {
        console.error("4. CHAT ROUTE ERROR:", error);
        res.status(500).json({
            error: error.message
        });
    }
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