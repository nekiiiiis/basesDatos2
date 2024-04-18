const User = require('./user.model');

exports.createUser = async function (userData) {
    const user = new User(userData);
    return await user.save();
};

exports.fetchUsers = async function () {
    return await User.find({});
};

exports.fetchUserById = async function (userId) {
    return await User.findById(userId);
};

exports.updateUser = async function (userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

exports.deleteUser = async function (userId) {
    return await User.findByIdAndDelete(userId);
};
