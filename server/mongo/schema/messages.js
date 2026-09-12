const userModel = require('./username.js');
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  humanMessage: { type: String },
  aiMessage: { type: String },
});
const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;