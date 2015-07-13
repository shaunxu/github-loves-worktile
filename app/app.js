(function () {
    'use strict';

    window.app = window.angular.module('GithubLovesWorktile', ['ui.router', 'ngWorktile']);

    window.app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('authorizing', {
                url: "/authorizing",
                templateUrl: "modules/security/authorizing.html"
            });
    });

    window.app.run(function ($worktile) {
        $worktile.clientId('54599295762c424b8aced6e7ee891a47');
    });
})();
