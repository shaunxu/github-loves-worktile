(function () {
    'use strict';

    var querystring = require('querystring');
    var request = require('request');
    var _logger = null;

    module.exports = function (logger) {
        _logger = logger;

        return {
            getAuthorizeUrl: function (req, res, callback) {
                var qs = querystring.stringify({
                    client_id: '582b096f33b699321fb1',
                    redirect_uri: 'http://localhost:22222/api/integration/github/callback',
                    scope: 'user:email,admin:repo_hook',
                    state: ''
                });
                var url = 'https://open.worktile.com/oauth2/authorize?' + qs;
                return callback(null, url);
            },
            callback: function (req, res, callback) {
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
                            code: code,
                            redirect_uri: 'http://localhost:22222/api/integration/github/callback'
                        }
                    };
                    request(options, function (error, response, body) {
                        console.log(JSON.stringify(body, null, 2));
                        return callback(error, body);
                    });
                }
                else {
                    return callback('No [code] in query string.', null);
                }
            }
        };
    };
})();
