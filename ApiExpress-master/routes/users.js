const express = require('express');
const router = express.Router();
const userModule = require('../modules/user/user.module')(); 

router.post('/users', userModule.UserMiddleware.addUser, function (req, res) {
    res.status(201).json(req.response);
});

router.get('/users', userModule.UserMiddleware.getUsers, function (req, res) {
    res.status(200).json(req.response);
});

router.get('/users/:userId', userModule.UserMiddleware.getUserById, function (req, res) {
    res.status(200).json(req.response);
});

router.put('/users/:userId', userModule.UserMiddleware.modifyUser, function (req, res) {
    res.status(200).json(req.response);
});

router.delete('/users/:userId', userModule.UserMiddleware.removeUser, function (req, res) {
    res.status(200).json(req.response);
});


module.exports = router;