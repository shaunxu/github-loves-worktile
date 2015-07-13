(function () {
    'use strict';

    var worktile = angular.module('ngWorktile', []);

    worktile.factory('$worktile', function ($http, $interval, $q) {
        var _clientId = '';

        return {
            clientId: function (clientId) {
                if (clientId) {
                    _clientId = clientId;
                }
                else {
                    clientId = _clientId;
                }
                return clientId;
            },
            getAuthorizeUrl: function (redirectUrl, display) {
                return 'https://open.worktile.com/oauth2/authorize?client_id=' + this.clientId() + '&redirect_uri=' + redirectUrl + '&display=' + (display || 'web');
            }
        };
    });
})();