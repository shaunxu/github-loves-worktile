(function () {
    'use strict';

    var _logger = null;
    var _model = null;

    module.exports = function (logger, model) {
        _logger = logger;
        _model = model;

        return {
            getUserByToken: function (req, res, callback) {
                var token = req.body.token;
                if (token) {
                    model.user.get(token, function (error, user) {
                        return callback(error, user);
                    });
                }
                else {
                    return callback('No token specified.', null);
                }
            }
        };
    };
})();