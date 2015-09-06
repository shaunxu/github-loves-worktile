(function (app) {
    'use strict';

    app.controller('SignInController', function ($scope, $window, $cookies, $storage, $api) {
        $scope.signin = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            $api.integrate('worktile', null, function (error, url) {
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

            $cookies.remove('__token');
            $storage.clear();
            $window.location = '/';
        };

        $scope.me = $storage.get('me');
        if (!$scope.me) {
            var token = $cookies.get('__token');
            if (token) {
                $api.request('users', 'getUserByToken', { token: token }, function (error, user) {
                    if (error) {
                        window.alert(window.angular.toJson(error, true));
                    }
                    else {
                        $cookies.remove('__token');
                        $storage.set('me', user, false);
                        $scope.me = user;
                    }
                });
            }
        }
    });

})(window.app);