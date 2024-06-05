const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
