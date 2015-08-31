(function () {
    'use strict';

    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/local', function (error) {
        if (error) {
            console.log('ERROR');
            console.log(JSON.stringify(error, null, 2));
        }
        else {
            console.log('MongoDB Connected.');
        }
    });

    require('./user');

    exports.User = mongoose.model('user');
})();
