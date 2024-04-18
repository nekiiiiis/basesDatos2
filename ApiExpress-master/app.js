var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
var UserController = require('./modules/user/user.module')().UserController;
var getAndStoreWalletBalance = require("./modules/etherscan/etherscan.client");  // Asegúrate de que esta es la única importación de getAndStoreWalletBalance

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Iniciar conexión a MongoDB
MongoDBUtil.init();

// Rutas
app.use('/users', UserController);

app.get('/', function (req, res) {
    var pkg = require(path.join(__dirname, 'package.json'));
    res.json({
        name: pkg.name,
        version: pkg.version,
        status: 'up'
    });
});

app.get("/address", async function (req, res) {
    const address = req.query.id;
    try {
        const walletData = await getAndStoreWalletBalance(address);
        res.json({ eth: walletData ? walletData.balance : 0 });  // Devolver 0 si walletData es nulo
    } catch (error) {
        console.error("Error retrieving address data:", error);
        res.status(500).json({ error: 'Failed to retrieve address data' });
    }
});

// Manejo de errores 404
app.use(function (req, res, next) {
    next(createError(404));
});

// Gestor de errores
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({
        message: res.locals.message,
        error: res.locals.error
    });
});

module.exports = app;
