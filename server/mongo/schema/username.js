const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
});
const usernameModel = mongoose.model('User', userSchema);
module.exports = usernameModel;