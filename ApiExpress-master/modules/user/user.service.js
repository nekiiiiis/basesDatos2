const User = require('./user.model');
const Wallet = require('../wallet/wallet.model'); // Ajusta esta ruta según tu estructura de carpetas

exports.createUser = async function (userData) {
    const wallet = new Wallet({
        address: userData.walletAddress,
        balance: 0 // Balance inicial, puede actualizarse después
    });

    const savedWallet = await wallet.save();

    const user = new User({
        email: userData.email,
        twitterUsername: userData.twitterUsername,
        wallet: savedWallet._id
    });

    return await user.save();
};

exports.fetchUsers = async function () {
    return await User.find({}).populate('wallet');
};

exports.fetchUserById = async function (userId) {
    return await User.findById(userId).populate('wallet');
};

exports.updateUser = async function (userId, updateData) {
    if (updateData.walletAddress) {
        const wallet = await Wallet.findOneAndUpdate(
            { address: updateData.walletAddress },
            { balance: updateData.balance || 0 },
            { new: true, upsert: true }
        );
        updateData.wallet = wallet._id;
        delete updateData.walletAddress;
    }

    return await User.findByIdAndUpdate(userId, updateData, { new: true }).populate('wallet');
};

exports.deleteUser = async function (userId) {
    const user = await User.findById(userId);
    if (user) {
        await Wallet.findByIdAndDelete(user.wallet);
        return await User.findByIdAndDelete(userId);
    }
    return null;
};
