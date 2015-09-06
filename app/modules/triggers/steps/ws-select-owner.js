(function (app) {
    'use strict';

    app.controller('wsSelectOwnerController', function ($scope, $storage, $api) {
        var me = $storage.get('me');
        $scope.connections = [];
        $scope.$context.data.connectionId = null;

        $scope.refresh = function (callback) {
            $api.request('connections', 'getConnectionsByUserID', {uid: me.id}, function (error, connections) {
                return callback(error, connections);
            });
        };

        $scope.selectConnect = function (event, id) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            $scope.$context.data.connectionId = id;
        };

        $scope.$context.behavior.entering = function (options, callback) {
            if (options.entered) {
                return callback();
            }
            else {
                $scope.refresh(function (error, connections) {
                    if (error) {
                        window.alert(window.angular.toJson(error, true));
                    }
                    else {
                        $scope.connections = connections;
                    }
                    return callback();
                });
            }
        };

        $scope.$context.behavior.leaving = function (options, callback) {
            if (options.forward) {
                return callback($scope.$context.data.connectionId > 0);
            } else {
                return callback(true);
            }
        };
    });

})(window.app);