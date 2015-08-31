(function () {
    'use strict';

    module.exports = function (connection_string, logger, callback) {
        var mongoose = require('mongoose');

        mongoose.connect(connection_string, function (error) {
            if (error) {
                return callback(error);
            }
            else {
                return callback(null);
            }
        });

        return {
            user: require('./user')(mongoose, logger)
        };
    };

})();
