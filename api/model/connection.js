(function () {
    'use strict';

    module.exports = function (mongoose, logger) {
        var Schema = mongoose.Schema;

        var ConnectionSchema = new Schema({
            uid: { type: String },
            token: { type: String },
            token_type: { type: String },
            token_scope: { type: String },
            id: { type: String },
            login: { type: String },
            display_name: { type: String },
            email: { type: String },
            avatar: { type: String }
        });
        var ConnectionModel = mongoose.model('connection', ConnectionSchema);

        return {
            set: function (uid, connection, callback) {
                ConnectionModel.findOne({ uid: uid, id: connection.id }, function (error, model) {
                    if (error) {
                        return callback(error, null);
                    }
                    else {
                        if (!model) {
                            model = new ConnectionModel();
                        }
                        model.uid = uid;
                        model.token = connection.token.access_token;
                        model.token_type = connection.token.token_type;
                        model.token_scope = connection.token.scope;
                        model.id = connection.user.id;
                        model.login = connection.user.login;
                        model.display_name = connection.user.name;
                        model.email = connection.user.email;
                        model.avatar = connection.user.avatar_url;
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
            },
            getAllByUserId: function (uid, callback) {
                ConnectionModel.find({ uid: uid }, function (error, connections) {
                    return callback(error, connections);
                });
            },
            getById: function (uid, id, callback) {
                ConnectionModel.find({ uid: uid, id: id }, function (error, connections) {
                    return callback(error, connections);
                });
            },
            remove: function (id, callback) {
                ConnectionModel.remove({ id: id }, function (error) {
                    return callback(error);
                });
            }
        };
    };
})();