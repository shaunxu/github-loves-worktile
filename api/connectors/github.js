(function () {
    'use strict';

    var querystring = require('querystring');
    var request = require('request');
    var _ = require('lodash');

    var _baseUrl = 'https://api.github.com';
    var _ua = 'GithubLovesWorktile/1.0';
    var _clientId = '582b096f33b699321fb1';
    var _clientSecret = '4e28fd015367e6cc613dbc466827303860cd4ab9';

    var _request = function (logger, token, options, callback) {
        options = _.assign({}, {
            path: '/',
            method: 'GET',
            qs: null,
            data: null
        }, options);
        var canContainsBody =
            options.method === 'POST' ||
            options.method === 'PUT' ||
            options.method === 'PATCH' ||
            options.method === 'DELETE' ||
            options.method === 'LINK' ||
            options.method === 'UNLINK' ||
            options.method === 'LOCK' ||
            options.method === 'PROPFIND';
        var opts = {
            url: _baseUrl + options.path,
            method: options.method,
            headers: {
                'User-Agent': _ua,
                'Accept': 'application/json',
                'Authorization': 'token ' + token
            },
            qs: options.qs,
            json: canContainsBody,
            body: canContainsBody ? options.data : null
        };

        logger.debug('GitHub API: Request\n' + JSON.stringify(opts, null, 2));
        request(opts, function (error, response, body) {
            body = _.isString(body) ? JSON.parse(body) : body;
            error = error || (response.statusCode >= 400 ? (body || response.statusCode) : null);

            logger.debug('GitHub API: Response\n' + JSON.stringify({
                    error: error,
                    response: response,
                    body: body
                }, null, 2));
            return callback(error, body);
        });
    };

    var Requester = function (logger, token) {
        this._logger = logger;
        this._token = token;
    };

    Requester.prototype.request = function (options, callback) {
        _request(this._logger, this._token, options, callback);
    };

    exports.request = _request;
    exports.Requestor = Requester;
    exports.utilities = {
        userAgent: _ua,
        clientId: _clientId,
        clientSecret: _clientSecret,
        authorizeUrl: function (options) {
            options = _.assign({}, {
                redirect_uri: '',
                scope: '',
                state: ''
            }, options);
            var qs = querystring.stringify({
                client_id: _clientId,
                redirect_uri: options.redirect_uri,
                scope: options.scope,
                state: options.state
            });
            return 'https://github.com/login/oauth/authorize?' + qs;
        },
        reviewUrl: function () {
            return 'https://github.com/settings/connections/applications/' + _clientId;
        }
    };

    //
    //module.exports = function (logger, model) {
    //    _logger = logger;
    //    _model = model;
    //
    //    return {
    //        getAuthorizeUrl: function (req, res, callback) {
    //            var qs = querystring.stringify({
    //                client_id: '582b096f33b699321fb1',
    //                redirect_uri: 'http://glw.local/api/integration/github/callback',
    //                scope: 'user:email,read:org,repo,admin:repo_hook',
    //                state: req.body.uid
    //            });
    //            var url = 'https://github.com/login/oauth/authorize?' + qs;
    //            return callback(null, url);
    //        },
    //        getReviewUrl: function (req, res, callback) {
    //            return callback(null, 'https://github.com/settings/connections/applications/582b096f33b699321fb1');
    //        },
    //        callback: function (req, res, callback) {
    //            var self = this;
    //            var code = req.query.code;
    //            var uid = req.query.state;
    //            if (code) {
    //                var options = {
    //                    url: 'https://github.com/login/oauth/access_token',
    //                    method: 'POST',
    //                    headers: {
    //                        'User-Agent': 'Github Loves Worktile',
    //                        'Accept': 'application/json'
    //                    },
    //                    qs: {
    //                        client_id: '582b096f33b699321fb1',
    //                        client_secret: '4e28fd015367e6cc613dbc466827303860cd4ab9',
    //                        code: code
    //                    }
    //                };
    //                request(options, function (error, response, body) {
    //                    if (error) {
    //                        return callback(error, null);
    //                    }
    //                    else {
    //                        var token = JSON.parse(body);
    //                        self.request(token.access_token, '/user', 'GET', null, null, function (error, data) {
    //                            if (error) {
    //                                return callback(error, null);
    //                            }
    //                            else {
    //                                var connection = {
    //                                    token: token,
    //                                    user: data
    //                                };
    //                                model.connection.set(uid, connection, function (error, reuslt) {
    //                                    if (error) {
    //                                        return callback(error, null);
    //                                    }
    //                                    else {
    //                                        res.redirect('/connections/all?highlight=' + reuslt.id);
    //                                    }
    //                                });
    //                            }
    //                        });
    //                    }
    //                });
    //            }
    //            else {
    //                return callback('No [code] in query string.', null);
    //            }
    //        },
    //        revoke: function (token, callback) {
    //            this.request(token, '/582b096f33b699321fb1/tokens/' + token, 'DELETE', null, null, callback);
    //        },
    //        request: function (token, path, method, qs, data, callback) {
    //            var options = {
    //                url: 'https://api.github.com' + path,
    //                method: method,
    //                headers: {
    //                    'User-Agent': 'Github Loves Worktile',
    //                    'Accept': 'application/json',
    //                    'Authorization': 'token ' + token
    //                },
    //                qs: qs,
    //                json: canContainsBody,
    //                body: canContainsBody ? data : null
    //            };
    //            logger.debug('GitHub API: Request\n' + JSON.stringify(options, null, 2));
    //            request(options, function (error, response, body) {
    //                body = _.isString(body) ? JSON.parse(body) : body;
    //                error = error || (response.statusCode >= 400 ? (body || response.statusCode) : null);
    //
    //                logger.debug('GitHub API: Response\n' + JSON.stringify({
    //                        error: error,
    //                        response: response,
    //                        body: body
    //                    }, null, 2));
    //                if (error) {
    //                    return callback(error, null);
    //                }
    //                else {
    //                    return callback(null, body);
    //                }
    //            });
    //        }
    //    };
    //};
})();