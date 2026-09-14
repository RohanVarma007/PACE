const userModel = require('./username.js');
const runModel = require('./splitschema.js');
const mongoose = require('mongoose');
const coachSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  runId: { type: mongoose.Schema.Types.ObjectId, ref: 'runModel', required: true },
  suggestions: { type: String },
});
const coachModel = mongoose.model('Coach', coachSchema);
module.exports = coachModel;