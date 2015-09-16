(function (app) {
    'use strict';

    app.controller('SignInController', function ($scope, $window, $storage, $api) {
        $scope.signin = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            $api.requestRaw('inbox', 'worktile', 'authorizeUrl', null, function (error, url) {
                if (error) {
                    alert(window.angular.toJson(error, true));
                }
                else {
                    $window.location = url;
                }
            });
        };

        $scope.signout = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            $storage.clear();
            $window.location = '/';
        };

        $scope.me = $storage.get('me');
    });

})(window.app);