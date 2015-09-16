(function (app) {
    'use strict';

    app.controller('AboutController', function ($scope, $api) {
        $scope.name = 'About';

        $api.request('events', 'all', null, function (error, events) {
            if (error) {
                alert(angular.toJson(error, true));
            }
            else {
                $scope.data = events;
            }
        });
    });

})(window.app);