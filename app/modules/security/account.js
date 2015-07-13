(function () {
    'use strict';

    window.app.controller('AccountController', function ($window, $scope, $state, $security, $worktile) {
        $scope.isLoggedIn = function () {
            return $security.isLoggedIn();
        };

        $scope.name = function () {
            return $security.user.displayName;
        };

        $scope.login = function () {
            var returnUrl = $state.href('authorizing', {}, { absolute: true });
            alert(returnUrl);
            $window.location = $worktile.getAuthorizeUrl(returnUrl, 'web');
        };
    });
})();