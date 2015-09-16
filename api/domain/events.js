(function () {
    'use strict';

    var _logger = null;
    var _model = null;

    module.exports = function (logger, model, utilities) {
        _logger = logger;
        _model = model;

        return {
            all: function (req, res, callback) {
                var metadata = utilities.factory.metadata[utilities.factory.types.event];
                return callback(null, metadata);
            }
        };
    };
})();