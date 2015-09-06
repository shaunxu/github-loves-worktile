(function (app) {
    'use strict';

    app.factory('$api', function ($http) {
        return {
            integrate: function (target, params, callback) {
                this.requestRaw('integration', target, 'getAuthorizeUrl', params, callback);
            },
            request: function (controllerName, actionName, params, callback) {
                this.requestRaw('domain', controllerName, actionName, params, callback);
            },
            requestRaw: function (moduleName, controllerName, actionName, params, callback) {
                var opts = {
                    method: 'POST',
                    url: '/api/' + moduleName + '/' + controllerName + '/' + actionName,
                    data: params || {},
                    headers: {}
                };
                $http(opts)
                    .success(function (data) {
                        return callback(null, data);
                    })
                    .error(function (error) {
                        return callback(error, null);
                    });
            }
        };
    });
})(window.app);