(function (app) {
    'use strict';

    app.controller('CompleteController', function ($window, $state, $api, $storage) {
        var uid = $state.params.seed;
        if (uid) {
            $api.request('users', 'getById', { uid: uid }, function (error, user) {
                if (error) {
                    window.alert(window.angular.toJson(error, true));
                }
                else {
                    $storage.set('me', user, false);
                    $window.location = '/';
                }
            });
        }
    });

})(window.app);