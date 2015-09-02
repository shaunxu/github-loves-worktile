(function () {
    'use strict';

    var querystring = require('querystring');
    var request = require('request');
    var _ = require('lodash');
    var _logger = null;
    var _model = null;

    module.exports = function (logger, model) {
        _logger = logger;
        _model = model;

        return {
            getAuthorizeUrl: function (req, res, callback) {
                var qs = querystring.stringify({
                    client_id: '3158c596bfe842ea96185b8951c4e289',
                    redirect_uri: 'http://glw.local/api/integration/worktile/callback',
                    state: '',
                    display: 'web'
                });
                var url = 'https://open.worktile.com/oauth2/authorize?' + qs;
                return callback(null, url);
            },
            callback: function (req, res, callback) {
                var self = this;
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
                            client_id: '3158c596bfe842ea96185b8951c4e289',
                            client_secret: 'cf22ee12a52540549054e7750caa1fd5',
                            code: code
                        }
                    };
                    request(options, function (error, response, body) {
                        if (error) {
                            return callback(error, null);
                        }
                        else {
                            self.request(body.access_token, '/user/profile', 'GET', null, null, function (error, data) {
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
                                            return callback(null, result);
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
            request: function (token, path, method, qs, data, callback) {
                var options = {
                    url: 'https://api.worktile.com/v1' + path,
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'access_token': token
                    },
                    qs: qs,
                    json: method !== 'GET',
                    body: method === 'GET' ? null : data
                };
                logger.debug('Worktile API: Request\n' + JSON.stringify(options, null, 2));
                request(options, function (error, response, body) {
                    body = _.isString(body) ? JSON.parse(body) : body;
                    error = error || (response.statusCode >= 400 ? (body || response.statusCode) : null);

                    logger.debug('Worktile API: Response\n' + JSON.stringify({
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
