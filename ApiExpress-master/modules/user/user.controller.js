const express = require('express');
const router = express.Router();
const userModule = require('./user.module')();

router.post('/', userModule.UserMiddleware.addUser, (req, res) => {
    res.status(201).json(req.response);
});

router.get('/', userModule.UserMiddleware.getUsers, (req, res) => {
    res.status(200).json(req.response);
});

router.get('/:userId', userModule.UserMiddleware.getUserById, (req, res) => {
    res.status(200).json(req.response);
});

router.put('/:userId', userModule.UserMiddleware.modifyUser, (req, res) => {
    res.status(200).json(req.response);
});

router.delete('/:userId', userModule.UserMiddleware.removeUser, (req, res) => {
    res.status(200).json(req.response);
});

router.get('/wallets', userModule.UserMiddleware.getUsers, (req, res) => {
    res.status(200).json(req.response);
});

router.put('/users/:walletAddress', userModule.UserMiddleware.modifyUser, (req, res) => {
    res.status(200).json(req.response);
});

module.exports = router;
