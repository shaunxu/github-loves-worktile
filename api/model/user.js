(function () {
    'use strict';

    module.exports = function (mongoose, logger) {
        var Schema = mongoose.Schema;

        var UserSchema = new Schema({
            token: { type: String },
            token_expired_on: { type: String },
            token_refresh: { type: String },
            id: { type: String },
            login: { type: String },
            display_name: { type: String },
            email: { type: String },
            description: { type: String },
            avatar: { type: String },

            profiles: [{
                key: { type: String },
                value: { type: String }
            }]

            //github_token: { type: String },
            //github_token_type: { type: String },
            //github_token_scope: { type: String },
            //github_id: { type: String },
            //github_username: { type: String },
            //github_email: { type: String },
            //github_avatar: { type: String },
            //github_display_name: { type: String },
            //
            //worktile_token: { type: String },
            //worktile_token_expired_on: { type: String },
            //worktile_token_refresh: { type: String },
            //worktile_id: { type: String },
            //worktile_username: { type: String },
            //worktile_email: { type: String },
            //worktile_avatar: { type: String },
            //worktile_display_name: { type: String },
        });
        var UserModel = mongoose.model('user', UserSchema);

        return {
            signin: function (user, callback) {
                UserModel.findOne({ id: user.data.uid }, function (error, model) {
                    if (error) {
                        return callback(error, null);
                    }
                    else {
                        if (!model) {
                            model = new UserModel();
                        }
                        model.token = user.token.access_token;
                        model.token_expired_on = Date.now() + user.token.expires_in * 1000;
                        model.token_refresh = user.token.refresh_token;
                        model.id = user.data.uid;
                        model.login = user.data.name;
                        model.display_name = user.data.display_name;
                        model.email = user.data.email;
                        model.description = user.data.desc;
                        model.avatar = user.data.avatar;
                        model.save(function (error, result) {
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
            //set_github: function (user, callback) {
            //    UserModel.findOne({ github_id: user.data.id }, function (error, model) {
            //        if (error) {
            //            return callback(error, null);
            //        }
            //        else {
            //            if (!model) {
            //                model = new UserModel();
            //            }
            //            model.github_token = user.token.access_token;
            //            model.github_token_type = user.token.token_type;
            //            model.github_token_scope = user.token.scope;
            //            model.github_id = user.data.id;
            //            model.github_username = user.data.login;
            //            model.github_email = user.data.email;
            //            model.github_avatar = user.data.avatar_url;
            //            model.github_display_name = user.data.name;
            //
            //            model.save(function (error, result) {
            //                if (error) {
            //                    return callback(error, null);
            //                }
            //                else {
            //                    callback(null, result);
            //                }
            //            });
            //        }
            //    });
            //}
        };
    };
})();