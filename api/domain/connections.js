(function () {
    'use strict';

    var async = require('async');
    var _ = require('lodash');

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
            getReposByConnectionID: function (req, res, callback) {
                var uid = req.body.uid;
                var cid = req.body.cid;
                if (uid && cid) {
                    model.connection.getById(uid, cid, function (error, connection) {
                        if (error) {
                            return callback(error, null);
                        }
                        else {
                            if (connection) {
                                integration.github.request(connection.token, '/user/repos', 'GET', null, null, function (error, repos) {
                                    return callback(error, _.sortBy(repos, function (repo) {
                                        return repo.full_name;
                                    }));
                                });
                            }
                            else {
                                return callback(null, []);
                            }
                        }
                    });
                }
                else {
                    return callback('No user ID or connection ID specified.', null);
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
                        else {
                            return callback(null, null);
                        }
                    }
                });
            }
        };
    };
})();