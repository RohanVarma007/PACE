const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    runName: String,
    totalDistance: String,
    runDuration: String,
    splits: [{ distance: String, time: String }]
});
module.exports = userSchema;