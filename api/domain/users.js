(function () {
    'use strict';

    var _logger = null;
    var _model = null;

    module.exports = function (logger, model) {
        _logger = logger;
        _model = model;

        return {
            getById: function (req, res, callback) {
                var uid = req.body.uid;
                if (uid) {
                    model.user.getById(uid, function (error, user) {
                        return callback(error, {
                            uid: user.uid,
                            avatar: user.avatar,
                            description: user.description,
                            email: user.email,
                            display_name: user.display_name,
                            profiles: user.profiles
                        });
                    });
                }
                else {
                    return callback('No uid specified.', null);
                }
            }
            //getUserByToken: function (req, res, callback) {
            //    var token = req.body.token;
            //    if (token) {
            //        model.user.get(token, function (error, user) {
            //            return callback(error, user);
            //        });
            //    }
            //    else {
            //        return callback('No token specified.', null);
            //    }
            //}
        };
    };
})();