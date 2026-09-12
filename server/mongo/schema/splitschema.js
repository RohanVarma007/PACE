const userModel = require('./username.js');
const mongoose = require('mongoose');
const splitSchema = new mongoose.Schema({
    runName: { type: String },
    totalDistance: { type: String},
    runDuration: { type: String},
    splits: [{ distance: { type: String}, time: { type: String } }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true }
});
const splitModel = mongoose.model('Run', splitSchema);
module.exports = splitModel;