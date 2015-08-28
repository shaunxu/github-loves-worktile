(function (app) {
    'use strict';

    app.factory('$api', function ($http) {
        return {
            request: function (moduleName, controllerName, actionName, params, callback) {
                var self = this;
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