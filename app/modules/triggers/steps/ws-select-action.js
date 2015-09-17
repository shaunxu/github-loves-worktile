(function (app) {
    'use strict';

    app.controller('wsSelectActionController', function ($scope, $api) {
        $scope.$context.data.selectedActions = [];

        $scope.$context.behavior.entering = function (options, callback) {
            if (options.entered) {
                return callback();
            }
            else {
                $api.request('actions', 'all', null, function (error, actions) {
                    if (error) {
                        alert(angular.toJson(error, true));
                    }
                    else {
                        $scope.actions = actions;
                    }
                    return callback();
                });
            }
        };
    });

})(window.app);