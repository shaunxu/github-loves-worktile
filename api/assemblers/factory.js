(function () {
    'use strict';

    var fs = require('fs');
    var async = require('async');
    var _ = require('lodash');

    module.exports = function (logger) {
        var loader = function (prefixing) {
            return function (error, callback) {
                fs.readdir('./', function (error, files) {
                    if (error) {
                        return callback(error, null);
                    }
                    else {
                        var items = {};
                        files.forEach(function (file) {
                            if (_.startsWith(file, prefixing + '-') && _.endsWith('.js')) {
                                items[file.substr(0, '.js'.length)] = new (require('./' + file))(logger);
                            }
                        });
                        return callback(null, items);
                    }
                });
            };
        };

        async.parallel({
            actions: loader('action'),
            events: loader('event')
        }, function (error, result) {
            if (error) {
                logger.error(error);
            }
            return result;
        });
    };
})();