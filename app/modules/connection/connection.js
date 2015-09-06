(function (app) {
    'use strict';

    app.controller('ConnectionListController', function ($scope, $window, $state, $api, $storage) {
        var me = $storage.get('me');
        $scope.highlightId = $state.params.highlight;
        $api.requestRaw('integration', 'github', 'getReviewUrl', null, function (error, url) {
            $scope.reviewUrl = url;
        });

        $scope.connect = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            $api.integrate('github', { uid: me.id }, function (error, url) {
                if (error) {
                    alert(window.angular.toJson(error, true));
                }
                else {
                    $window.location = url;
                }
            });
        };

        $scope.revoke = function (event, id) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            $api.request('connections', 'revoke', { uid: me.id, id: id }, function (error) {
                if (error) {
                    alert(window.angular.toJson(error, true));
                }
                else {
                    $state.reload('connections.list');
                }
            });
        };

        $api.request('connections', 'getConnectionsByUserID', { uid: me.id }, function (error, connections) {
            if (error) {
                alert(window.angular.toJson(error, true));
            }
            else {
                $scope.connections = connections;
            }
        });
    });

})(window.app);