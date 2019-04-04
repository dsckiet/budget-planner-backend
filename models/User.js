const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
});

module.exports = User = mongoose.model('user', UserSchema);