(function () {
    'use strict';

    var uuid = require('uuid');

    var Assembler = function (logger, worktile, name) {
        this._logger = logger;
        this._worktile = worktile;
        this._name = name;
    };

    Assembler.prototype.process = function (payload, callback) {
        var self = this;
        var pid = uuid.v4();
        var startTime = Date.now();
        this.onProcess(pid, payload, function (error, result) {
            var elapsed = Date.now() - startTime;
            var entry = {
                request: payload,
                error: error,
                result: result
            };
            self._logger[error ? 'error' : 'debug']('[' + pid + ']: ' + self._name + ' (' + elapsed + 'ms)\n' + JSON.stringify(entry, null, 2));
            return callback(error, result);
        });
    };

    Assembler.prototype.onProcess = function (pid, payload, callback) {
        return callback(null, null);
    };

    module.exports = Assembler;
})();