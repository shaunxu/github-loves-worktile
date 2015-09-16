(function () {
    'use strict';

    window.app = window.angular.module('GithubLovesWorktile', [
        'ui.router',
        'ngCookies',
        'ui.bootstrap',
        'sx.wizard'
    ]);

    window.app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/about');

        $stateProvider
            .state('complete', {
                url: '/complete?seed',
                templateUrl: 'modules/security/complete.html',
                controller: 'CompleteController'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'modules/security/signup.html',
                controller: 'SignUpController'
            })
            .state('connections', {
                abstract: true,
                url: '/connections',
                templateUrl: 'modules/connection/connection.html'
            })
            .state('connections.list', {
                url: '/all?highlight',
                templateUrl: 'modules/connection/connection-list.html',
                controller: 'ConnectionListController'
            })
            .state('triggers', {
                abstract: true,
                url: '/triggers',
                templateUrl: 'modules/triggers/triggers.html'
            })
            .state('triggers.list', {
                url: '/all?cid',
                templateUrl: 'modules/triggers/triggers-list.html',
                controller: 'TriggerListController'
            })
            //.state('signin.github', {
            //    url: '/github',
            //    templateUrl: 'modules/security/signin-github.html',
            //    controller: 'SignInGithubController'
            //})
            //.state('signin.worktile', {
            //    url: '/worktile',
            //    templateUrl: 'modules/security/signin-worktile.html',
            //    controller: 'SignInWorktileController'
            //})
            //.state('signin.complete', {
            //    url: '/complete',
            //    templateUrl: 'modules/security/signin-complete.html',
            //    controller: 'SignInCompleteController'
            //})
            .state('about', {
                url: '/about',
                templateUrl: 'modules/misc/about.html',
                controller: 'AboutController'
            });
    });
})();
