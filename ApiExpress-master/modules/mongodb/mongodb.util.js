(function () {
    'use strict';

    module.exports = {
        init: init
    };

    var mongoose = require('mongoose');

    var mongodbConfig = require('../../config/mongodb/mongodb-config').mongodb;

    function init() {
        var options = {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        };

        var connectionString = prepareConnectionString(mongodbConfig);
       
        mongoose.connect(connectionString, options)
            .then(function () {
                console.log("MongoDB connection successful. DB: " + connectionString);
            })
            .catch(function (error) {
                console.log("Error occurred while connecting to DB: : " + connectionString, error.message);
            });
    }

    function prepareConnectionString(config) {
        let connectionString = 'mongodb://';
    
        if (config.user && config.password) {
            connectionString += encodeURIComponent(config.user) + ':' + encodeURIComponent(config.password) + '@';
        }
    
        connectionString += config.server + '/' + config.database;
        connectionString += '?authSource=admin'; // Asegúrate de que el authSource sea correcto
    
        return connectionString;
    }
    
})();
