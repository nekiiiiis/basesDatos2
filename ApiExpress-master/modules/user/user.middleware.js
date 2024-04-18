const UserService = require('./user.service');

const userMiddleware = {
    addUser: async (req, res, next) => {
        try {
            const data = await UserService.createUser(req.body);
            req.response = data;
            next();
        } catch (error) {
            next(error);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const data = await UserService.fetchUsers();
            req.response = data;
            next();
        } catch (error) {
            next(error);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const data = await UserService.fetchUserById(req.params.userId);
            req.response = data;
            next();
        } catch (error) {
            next(error);
        }
    },

    modifyUser: async (req, res, next) => {
        try {
            const walletAddress = req.params.walletAddress;
            const data = await UserService.updateUserByWalletAddress(walletAddress, req.body);
            req.response = data;
            next();
        } catch (error) {
            next(error);
        }
    },

    removeUser: async (req, res, next) => {
        try {
            const data = await UserService.deleteUser(req.params.userId);
            req.response = data;
            next();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = userMiddleware;
