(function () {
    'use strict';

    var request = require('request');

    module.exports = function (logger, model, utilities) {
        return {
            authorizeUrl: function (req, res, callback) {
                return callback(null, utilities.connector.github.utilities.authorizeUrl({
                    redirect_uri: 'http://glw.local/api/inbox/github/callback',
                    scope: 'user:email,read:org,repo,admin:repo_hook',
                    state: req.body.uid
                }));
            },
            reviewUrl: function (req, res, callback) {
                return callback(null, utilities.connector.github.utilities.reviewUrl());
            },
            callback: function (req, res, callback) {
                var code = req.query.code;
                var uid = req.query.state;
                if (code) {
                    var options = {
                        url: 'https://github.com/login/oauth/access_token',
                        method: 'POST',
                        headers: {
                            'User-Agent': utilities.connector.github.utilities.userAgent,
                            'Accept': 'application/json'
                        },
                        qs: {
                            client_id: utilities.connector.github.utilities.clientId,
                            client_secret: utilities.connector.github.utilities.clientSecret,
                            code: code
                        }
                    };
                    request(options, function (error, response, body) {
                        if (error) {
                            return callback(error, null);
                        }
                        else {
                            var token = JSON.parse(body);
                            connector.github.request(logger, token.access_token, {
                                path: '/user',
                                method: 'GET'
                            }, function (error, data) {
                                if (error) {
                                    return callback(error, null);
                                }
                                else {
                                    var connection = {
                                        token: token,
                                        user: data
                                    };
                                    model.connection.set(uid, connection, function (error, reuslt) {
                                        if (error) {
                                            return callback(error, null);
                                        }
                                        else {
                                            res.redirect('/connections/all?highlight=' + reuslt.id);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    return callback('No [code] in query string.', null);
                }
            },
            webhook: function (req, res, callback) {
                var uid = req.query.uid;
                var cid = req.query.cid;
                var tid = req.query.tid;

                if (uid && cid && tid) {
                    // todo: find a trigger from database
                    var trigger = {};

                    if (trigger) {
                        if (trigger.enabled) {
                            // todo: create assembler

                        }
                        else {
                            logger.debug('Trigger [' + trigger.name + '] is disabled.');
                            res.status(204).send('Ignore this webhook event since the trigger is disabled.');
                        }
                    }
                    else {
                        logger.error('Cannot find trigger in database specified. \n' + JSON.stringify(req.query, null, 2));
                        res.status(400).send('Cannot find trigger specified.');
                    }
                }
                else {
                    logger.error('Arguments in query string were not specified. \n' + JSON.stringify(req.query, null, 2));
                    res.status(400).send('Arguments not specified.');
                }
            }
        };
    };
})();