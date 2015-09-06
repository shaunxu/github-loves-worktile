(function (app) {
    'use strict';

    app.controller('TriggerListController', function ($scope, $window, $state, $api, $storage, $wizard) {
        var me = $storage.get('me');
        $scope.cid = $state.params.cid;

        var wizard = $wizard
            .$new({
                title: 'Create a new trigger'
            })
            .addStep({
                id: 'select-repo',
                title: 'Select a repository',
                templateUrl: 'modules/triggers/steps/ws-select-repo.html',
                controller: 'wsSelectRepoController'
            })
            .addStep({
                id: 'select-event',
                title: 'Select event from GitHub',
                templateUrl: 'modules/triggers/steps/ws-select-event.html',
                controller: 'wsSelectEventController'
            })
            .addStep({
                id: 'select-action',
                title: 'Select action in Worktile',
                templateUrl: 'modules/triggers/steps/ws-select-action.html',
                controller: 'wsSelectActionController'
            })
            .addStep({
                id: 'complete',
                title: 'Confirmation',
                templateUrl: 'modules/triggers/steps/ws-complete.html',
                controller: 'wsCompleteController'
            });

        $scope.new = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            wizard.open({}, function (result) {
                alert(angular.toJson(result, true));
            }, window.angular.noop);
        };
    });

})(window.app);