const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
    balance: { type: Number, required: true }
});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
