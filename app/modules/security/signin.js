(function (app) {
    'use strict';

    app.controller('SignInController', function ($scope, $window, $cookies, $api) {
        var token = $cookies.get('__token');
        if (token) {

        }

        //$scope.me = $cookies.getAll();
        //if ($scope.me &&
        //    $scope.me.hasOwnProperty('__token') &&
        //    $scope.me.hasOwnProperty('__display_name') &&
        //    $scope.me.hasOwnProperty('__avatar')) {
        //
        //    $window.sessionStorage.setItem('__me', window.angular.toJson($scope.me));
        //    window.angular.forEach(Object.keys(cookies), function (key) {
        //        $cookies.remove(key);
        //    });
        //}
        //else {
        //    $scope.me = null;
        //}

        $scope.signin = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            $api.request('integration', 'worktile', 'getAuthorizeUrl', null, function (error, url) {
                if (error) {
                    alert(window.angular.toJson(error, true));
                }
                else {
                    $window.location = url;
                }
            });
        };
    });

    //app.controller('SignInGithubController', function ($scope, $window, $api) {
    //    $scope.name = 'Sign In - Github';
    //    $scope.integrate = function () {
    //        $api.request('integration', 'github', 'getAuthorizeUrl', null, function (error, url) {
    //            if (error) {
    //                alert(window.angular.toJson(error, true));
    //            }
    //            else {
    //                $window.location = url;
    //            }
    //        });
    //    };
    //});
    //
    //app.controller('SignInWorktileController', function ($scope, $window, $api) {
    //    $scope.name = 'Sign In - Worktile';
    //
    //    $scope.integrate = function () {
    //        $api.request('integration', 'worktile', 'getAuthorizeUrl', null, function (error, url) {
    //            if (error) {
    //                alert(window.angular.toJson(error, true));
    //            }
    //            else {
    //                $window.location = url;
    //            }
    //        });
    //    };
    //});
    //
    //app.controller('SignInCompleteController', function ($scope) {
    //    $scope.name = 'Sign In - Complete';
    //});

})(window.app);