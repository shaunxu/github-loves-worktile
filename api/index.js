(function () {
    'use strict';

    exports.initialize = function (app, logger) {
        var model = require('./model')('mongodb://localhost/local', logger, function (error) {
            if (error) {
                logger.error('MongoDB connection failed.');
                logger.error(error);
            }
            else {
                logger.info('MongoDB connected.');
                logger.info('API launched.');
            }
        });
        var integration = {
            github: require('./integration/github.js')(logger, model),
            worktile: require('./integration/worktile.js')(logger, model)
        };

        var _validate = function (controller, req, callback) {
            var validator = controller.validate;
            if (validator) {
                validator(req, function (error) {
                    return callback(error);
                });
            }
            else {
                return callback(null);
            }
        };

        var _logAndSendErrorOrResult = function (moduleName, controllerName, actionName, params, error, result, res) {
            var message = {
                moduleName: moduleName,
                controllerName: controllerName,
                actionName: actionName,
                params: params
            };
            if (error) {
                message.error = error;
                logger.error(message);
                res.status(500).send(message);
            }
            else {
                message.result = result;
                logger.debug(message);
                res.json(result);
            }
        };

        app.use(function (req, res) {
            // api request format: api/[module]/[controller]/[action]
            var segments = req.path.split('/').filter(function (segment) {
                return segment.length > 0;
            });

            if (segments.length < 4) {
                return _logAndSendErrorOrResult(null, null, null, null, 'Invalid api request [' + req.path + ']', null, res);
            }

            var moduleName = segments[1];
            var controllerName = segments[2];
            var actionName = segments[3];

            var controller = require('./' + moduleName + '/' + controllerName + '.js')(logger, model, integration);
            if (!controller) {
                return _logAndSendErrorOrResult(moduleName, controllerName, null, null, 'Cannot find controller [' + moduleName + '.' + controllerName + '] from request path [' + req.path + ']', null, res);
            }
            if (!controller[actionName]) {
                return _logAndSendErrorOrResult(moduleName, controllerName, actionName, null, 'Cannot find action [' + moduleName + '.' + controllerName + '.' + actionName + '] from request path [' + req.path + ']', null, res);
            }

            req.body = req.body || {};
            _validate(controller, req, function (error) {
                if (error) {
                    return _logAndSendErrorOrResult(moduleName, controllerName, actionName, req.body, error, null, res);
                }
                else {
                    controller[actionName](req, res, function (error, result) {
                        if (error) {
                            return _logAndSendErrorOrResult(moduleName, controllerName, actionName, req.body, error, null, res);
                        }
                        else {
                            result = result || {};
                            return _logAndSendErrorOrResult(moduleName, controllerName, actionName, req.body, null, result, res);
                        }
                    });
                }
            });
        });
    };

})();