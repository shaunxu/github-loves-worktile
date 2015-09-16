(function () {
    'use strict';

    var request = require('request');

    module.exports = function (logger, model, utilities) {
        return {
            authorizeUrl: function (req, res, callback) {
                return callback(null, utilities.connector.worktile.utilities.authorizeUrl({
                    redirect_uri: 'http://glw.local/api/inbox/worktile/callback',
                    state: req.body.uid
                }));
            },
            callback: function (req, res, callback) {
                var code = req.query.code;
                if (code) {
                    var options = {
                        url: 'https://api.worktile.com/oauth2/access_token',
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                        json: true,
                        body: {
                            client_id: utilities.connector.worktile.utilities.clientId,
                            client_secret: utilities.connector.worktile.utilities.clientSecret,
                            code: code
                        }
                    };
                    request(options, function (error, response, body) {
                        if (error) {
                            return callback(error, null);
                        }
                        else {
                            utilities.connector.worktile.request(logger, body.access_token, {
                                path: '/user/profile',
                                method: 'GET'
                            }, function (error, data) {
                                if (error) {
                                    return callback(error, null);
                                }
                                else {
                                    var user = {
                                        token: body,
                                        data: data
                                    };
                                    model.user.signin(user, function (error, result) {
                                        if (error) {
                                            return callback(error, null);
                                        }
                                        else {
                                            res.redirect('/complete?seed=' + result.uid);
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
            }
        };
    };
})();