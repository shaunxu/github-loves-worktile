(function () {
    'use strict';

    window.app.factory('$security', function ($window) {
        return {
            /**
             * user = {
             *     id, (string)
             *     displayName, (string),
             *     avatar, (url)
             *     token (string)
             * }
             */
            user: function (user) {
                var key = 'u';
                if (user) {
                    $window.localStorage.setItem(key, user);
                }
                else {
                    user = $window.localStorage.getItem(key);
                }
                return window.angular.extend({}, { avatar: 'res/ic_face_black_48dp_1x.png' }, user);
            },
            isLoggedIn: function () {
                var user = this.user();
                return user && user.id && user.token;
            }
        };
    });
})();