(function () {
    'use strict';

    var https = require('https');
    var querystring = require('querystring');
    var _logger = null;

    module.exports = function (logger) {
        _logger = logger;

        return {
            getAuthorizeUrl: function (req, res, callback) {
                var qs = querystring.stringify({
                    client_id: '582b096f33b699321fb1',
                    redirect_uri: 'http://localhost:22222/api/integration/github/callback',
                    scope: 'user;repo_hook',
                    state: ''
                });
                var url = 'https://github.com/login/oauth/authorize?' + qs;
                return callback(null, url);
            },
            callback: function (req, res, callback) {
                var code = req.query.code;
                if (code) {
                    var options = {
                        hostname: 'github.com',
                        port: 443,
                        path: '/login/oauth/access_token',
                        method: 'POST'
                    };
                }
                else {
                    return callback('No [code] in query string.', null);
                }
            }
        };
    };
})();