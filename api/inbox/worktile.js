(function () {
    'use strict';

    var request = require('request');

    module.exports = function (logger, model, connector) {
        return {
            authorizeUrl: function (req, res, callback) {
                return callback(null, connector.worktile.authorizeUrl({
                    redirect_uri: 'http://glw.local/api/inbox/github/callback',
                    scope: 'user:email,read:org,repo,admin:repo_hook',
                    state: req.body.uid
                }));
            },
            callback: function (req, res, callback) {
                var code = req.query.code;
                var uid = req.query.state;
                if (code) {
                    var options = {
                        url: 'https://api.worktile.com/oauth2/access_token',
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                        qs: {
                            client_id: connector.worktile.clientId,
                            client_secret: connector.worktile.clientSecret,
                            code: code
                        }
                    };
                    request(options, function (error, response, body) {
                        if (error) {
                            return callback(error, null);
                        }
                        else {
                            connector.worktile.request(logger, body.access_token, {
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
                                            res.cookie('__token', result.token);
                                            res.redirect('/');
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