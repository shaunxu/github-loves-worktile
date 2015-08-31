(function (app) {
    'use strict';

    app.controller('SignUpController', function ($scope, $api) {
        $scope.github = {
            id: '554989',
            username: 'shaunxu',
            email: 'jfarrio@gmail.com',
            avatar: 'https://avatars.githubusercontent.com/u/554989?v=3'
        };
        $scope.connect_github = function () {

        };

        $scope.worktile = {
            id: 'bfd19abcf27108',
            username: 'shaun',
            email: 'shaun@worktile.com',
            avatar: 'https://api.worktile.com/avatar/80/02f1796f623341488ce445fc7133da5b.jpg'
        };
        $scope.connect_worktile = function () {

        };
    });

})(window.app);
