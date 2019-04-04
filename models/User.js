const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    username: String,
    imageUrl: String,
    phone: String,
    wallet: {
        spent: Number,
        budget: Number
    }
});

module.exports = User = mongoose.model('user', UserSchema);