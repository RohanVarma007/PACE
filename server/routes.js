const express = require("express");
const router = express.Router();
const { runsConnection } = require('./db.js');
const userSchema = require('./splitschema.js');
const splitModel = runsConnection.model('Run', userSchema);


router.post("/", (req, res) => {
    let inpu = splitModel.create(req.body)
    .then((data) => {
        res.status(201).json(data);
    })
    .catch((err) => {
        res.status(500).json({ error: "Failed to save run" });
    });
});

module.exports = router;