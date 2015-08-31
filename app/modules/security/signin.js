(function (app) {
    'use strict';

    app.controller('SignInGithubController', function ($scope, $window, $api) {
        $scope.name = 'Sign In - Github';
        $scope.integrate = function () {
            $api.request('integration', 'github', 'getAuthorizeUrl', null, function (error, url) {
                if (error) {
                    alert(window.angular.toJson(error, true));
                }
                else {
                    $window.location = url;
                }
            });
        };
    });

    app.controller('SignInWorktileController', function ($scope) {
        $scope.name = 'Sign In - Worktile';
    });

    app.controller('SignInCompleteController', function ($scope) {
        $scope.name = 'Sign In - Complete';
    });

})(window.app);