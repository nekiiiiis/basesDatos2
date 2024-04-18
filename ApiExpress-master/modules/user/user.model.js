const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    twitterUsername: {
        type: String,
        required: false,
        unique: false
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
