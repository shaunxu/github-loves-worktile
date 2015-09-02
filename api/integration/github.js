(function () {
    'use strict';

    var querystring = require('querystring');
    var request = require('request');
    var _logger = null;
    var _model = null;

    module.exports = function (logger, model) {
        _logger = logger;
        _model = model;

        return {
            getAuthorizeUrl: function (req, res, callback) {
                var qs = querystring.stringify({
                    client_id: '582b096f33b699321fb1',
                    redirect_uri: 'http://glw.local/api/integration/github/callback',
                    scope: 'user:email,admin:repo_hook',
                    state: ''
                });
                var url = 'https://github.com/login/oauth/authorize?' + qs;
                return callback(null, url);
            },
            callback: function (req, res, callback) {
                var self = this;
                var code = req.query.code;
                if (code) {
                    var options = {
                        url: 'https://github.com/login/oauth/access_token',
                        method: 'POST',
                        headers: {
                            'User-Agent': 'Github Loves Worktile',
                            'Accept': 'application/json'
                        },
                        qs: {
                            client_id: '582b096f33b699321fb1',
                            client_secret: '4e28fd015367e6cc613dbc466827303860cd4ab9',
                            code: code
                        }
                    };
                    request(options, function (error, response, body) {
                        if (error) {
                            return callback(error, null);
                        }
                        else {
                            var token = JSON.parse(body);
                            self.request(token.access_token, '/user', 'GET', null, null, function (error, data) {
                                if (error) {
                                    return callback(error, null);
                                }
                                else {
                                    var user = {
                                        token: token,
                                        data: data
                                    };
                                    // todo: add github account

                                    return callback(null, user);
                                }
                            });
                        }
                    });
                }
                else {
                    return callback('No [code] in query string.', null);
                }
            },
            request: function (token, path, method, qs, data, callback) {
                var options = {
                    url: 'https://api.github.com' + path,
                    method: method,
                    headers: {
                        'User-Agent': 'Github Loves Worktile',
                        'Accept': 'application/json',
                        'Authorization': 'token ' + token
                    },
                    qs: qs,
                    json: method !== 'GET',
                    body: method === 'GET' ? null : data
                };
                logger.debug('GitHub API: Request\n' + JSON.stringify(options, null, 2));
                request(options, function (error, response, body) {
                    body = _.isString(body) ? JSON.parse(body) : body;
                    error = error || (response.statusCode >= 400 ? (body || response.statusCode) : null);

                    logger.debug('GitHub API: Response\n' + JSON.stringify({
                            error: error,
                            response: response,
                            body: body
                        }, null, 2));
                    if (error) {
                        return callback(error, null);
                    }
                    else {
                        return callback(null, body);
                    }
                });
            }
        };
    };
})();