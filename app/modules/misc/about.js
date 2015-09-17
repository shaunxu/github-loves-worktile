(function (app) {
    'use strict';

    app.controller('AboutController', function ($scope, $api) {
        $scope.name = 'About';

        $api.request('actions', 'all', null, function (error, actions) {
            if (error) {
                alert(angular.toJson(error, true));
            }
            else {
                $scope.data = actions;
            }
            return callback();
        });
    });

})(window.app);