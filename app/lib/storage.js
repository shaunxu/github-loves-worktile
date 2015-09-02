(function (app) {
    'use strict';

    app.factory('$storage', function ($window) {
        return {
            set: function (key, value, persistent) {
                value = window.angular.isObject(value) ? window.angular.toJson(value, false) : value;
                if (persistent) {
                    $window.localStorage.setItem(key, value);
                }
                else {
                    $window.sessionStorage.setItem(key, value);
                }
                return value;
            },
            get: function (key) {
                var value = null;
                var raw = $window.sessionStorage.getItem(key) || $window.localStorage.getItem(key);
                try {
                    value = window.angular.fromJson(raw);
                }
                catch (ex) {
                    value = raw;
                }
                return value;
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
                $window.sessionStorage.removeItem(key);
            },
            clear: function () {
                var i;
                i = $window.sessionStorage.length;
                while (i--) {
                    $window.sessionStorage.removeItem($window.sessionStorage.key(i));
                }
                i = $window.localStorage.length;
                while (i--) {
                    $window.localStorage.removeItem($window.localStorage.key(i));
                }
            }
        };
    });
})(window.app);