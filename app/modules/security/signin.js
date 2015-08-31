(function (app) {
    'use strict';

    app.controller('SignInController', function ($scope, $api) {
        $scope.githubUsername = '';
        $scope.worktileUsername = '';
        $scope.sameUsername = true;

        $scope.signin = function () {

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