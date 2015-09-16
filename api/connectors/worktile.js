(function () {
    'use strict';

    var querystring = require('querystring');
    var request = require('request');
    var _ = require('lodash');

    var _baseUrl = 'https://api.worktile.com/v1';
    var _ua = 'GithubLovesWorktile/1.0';
    var _clientId = '3158c596bfe842ea96185b8951c4e289';
    var _clientSecret = 'cf22ee12a52540549054e7750caa1fd5';

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
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'access_token': token
            },
            qs: options.qs,
            json: canContainsBody,
            body: canContainsBody ? options.data : null
        };

        logger.debug('Worktile API: Request\n' + JSON.stringify(opts, null, 2));
        request(opts, function (error, response, body) {
            body = _.isString(body) ? JSON.parse(body) : body;
            error = error || (response.statusCode >= 400 ? (body || response.statusCode) : null);

            logger.debug('Worktile API: Response\n' + JSON.stringify({
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
                state: '',
                display: 'web'
            }, options);
            var qs = querystring.stringify({
                client_id: _clientId,
                redirect_uri: options.redirect_uri,
                state: options.state,
                display: options.display
            });
            return 'https://open.worktile.com/oauth2/authorize?' + qs;
        }
    };
})();