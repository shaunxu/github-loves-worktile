(function () {
    'use strict';

    module.exports = function (mongoose, logger) {
        var Schema = mongoose.Schema;

        var UserSchema = new Schema({
            github_token: { type: String },
            github_token_type: { type: String },
            github_token_scope: { type: String },
            github_id: { type: String },
            github_username: { type: String },
            github_email: { type: String },
            github_avatar: { type: String },

            worktile_token: { type: String },
            worktile_token_expired_on: { type: String },
            worktile_token_refresh: { type: String },
            worktile_username: { type: String },
            worktile_email: { type: String },
            worktile_avatar: { type: String },

            display_name: { type: String },
            avatar: { type: String },
            profiles: [{
                key: { type: String },
                value: { type: String }
            }]
        });
        var UserModel = mongoose.model('user', UserSchema);

        return {
            set_github: function (user, callback) {
                UserModel.findOne({ github_id: user.data.id }, function (error, model) {
                    if (error) {
                        return callback(error, null);
                    }
                    else {
                        if (!model) {
                            model = new UserModel();
                        }
                        model.github_token = user.token.access_token;
                        model.github_token_type = user.token.token_type;
                        model.github_token_scope = user.token.scope;
                        model.github_id = user.data.id;
                        model.github_username = user.data.login;
                        model.github_email = user.data.email;
                        model.github_avatar = user.data.avatar_url;

                        model.save(function (error, result) {
                            if (error) {
                                return callback(error, null);
                            }
                            else {
                                callback(null, result);
                            }
                        });
                    }
                });
            }
        };
    };
})();