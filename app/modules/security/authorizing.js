(function () {
    'use strict';

    window.app.controller('AuthorizingController', function ($location, $scope, $security, $worktile) {
        var code = $location.search('code');
        if (window.angular.isString(code) && code.length > 0) {

        }
        else {
            window.alert('Invalid code from Worktile. (code = "' + code + '")');
        }
    });
})();