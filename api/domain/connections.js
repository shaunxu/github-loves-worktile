(function () {
    'use strict';

    var _logger = null;
    var _model = null;

    module.exports = function (logger, model, integration) {
        _logger = logger;
        _model = model;

        return {
            getConnectionsByUserID: function (req, res, callback) {
                var uid = req.body.uid;
                if (uid) {
                    model.connection.getAllByUserId(uid, function (error, connections) {
                        return callback(error, connections);
                    });
                }
                else {
                    return callback('No user ID specified.', null);
                }
            },
            revoke: function (req, res, callback) {
                model.connection.getById(req.body.uid, req.body.id, function (error, connection) {
                    if (error) {
                        return callback(error, null);
                    }
                    else {
                        if (connection) {
                            integration.github.revoke(connection.token, function (error) {
                                if (error) {
                                    return callback(error, null);
                                }
                                else {
                                    model.connection.remove(connection.id, function (error) {
                                        return callback(error, null);
                                    });
                                }
                            });
                        }
                    }
                });
            }
        };
    };
})();