(function (app) {
    'use strict';

    app.filter('permissions', function () {
        return function (input) {
            if (window.angular.isObject(input)) {
                var permissions = [];
                window.angular.forEach(input, function (value, key) {
                    if (value === true) {
                        permissions.push(key);
                    }
                });
                return permissions.join(', ');
            }
            else {
                return input;
            }
        };
    });

    app.filter('placeholder', function () {
        return function (input) {
            return '{{' + input + '}}';
        };
    });
})(window.app);