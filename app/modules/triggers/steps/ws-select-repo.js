(function (app) {
    'use strict';

    app.controller('wsSelectRepoController', function ($scope, $storage, $api) {
        var me = $storage.get('me');
        $scope.repos = [];
        $scope.$context.data.repoId = null;

        $scope.selectRepo = function (event, id) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            $scope.$context.data.repoId = id;
        };

        $scope.refresh = function (callback) {
            $api.request('connections', 'getReposByConnectionID', {uid: me.id, cid: $scope.$context.data.connectionId}, function (error, repos) {
                return callback(error, repos);
            });
        };

        $scope.$context.behavior.entering = function (options, callback) {
            if (options.entered) {
                return callback();
            }
            else {
                $scope.refresh(function (error, repos) {
                    if (error) {
                        window.alert(window.angular.toJson(error, true));
                    }
                    else {
                        $scope.repos = repos;
                    }
                    return callback();
                });
            }
        };
    });

})(window.app);