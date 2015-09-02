(function () {
    'use strict';

    window.app = window.angular.module('GithubLovesWorktile', ['ui.router']);

    window.app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/about');

        $stateProvider
            //.state('signin', {
            //    url: '/signin',
            //    templateUrl: 'modules/security/signin.html',
            //    controller: 'SignInController'
            //})
            .state('signup', {
                url: '/signup',
                templateUrl: 'modules/security/signup.html',
                controller: 'SignUpController'
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
