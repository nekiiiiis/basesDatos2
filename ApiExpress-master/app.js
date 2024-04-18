var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
var userModule = require('./modules/user/user.module')(); // Se asume que userModule es una función que retorna un objeto
var getAndStoreWalletBalance = require("./modules/etherscan/etherscan.client");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Agregar para servir archivos estáticos

// Iniciar conexión a MongoDB
MongoDBUtil.init();

// Rutas
app.use('/users', userModule.UserController); // Asumiendo que UserController está correctamente definido en user.module

// Página principal - ahora servirá el formulario HTML
app.get('/assign-user', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'userForm.html'));
});

// Ruta para obtener el saldo de una dirección de wallet
app.get("/address/:walletAddress", async function (req, res) {
    const walletAddress = req.params.walletAddress;
    try {
        const walletData = await getAndStoreWalletBalance(walletAddress);
        res.json({ eth: walletData ? walletData.balance : "Saldo no disponible" });  // Cambiado para que devuelva un mensaje si no hay datos
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
