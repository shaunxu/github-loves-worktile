(function () {
    'use strict';

    var fs = require('fs');
    var _ = require('lodash');

    var _getMetadata = function (type) {
        var result = {};
        fs.readdirSync('./api/assemblers').forEach(function (file) {
            var path = './api/assemblers/' + file;
            if (fs.statSync(path).isFile() && _.startsWith(file, type + '-') && _.endsWith(file, '.js')) {
                var instance = new (require('./' + file))(null);
                var metadata = instance.getMetadata();
                metadata.path = path;
                metadata.file = file;
                result[metadata.name] = metadata;
            }
        });
        return result;
    };

    module.exports = function (logger) {
        var types = {
            event: 'event',
            action: 'action'
        };

        var metadata = (function () {
            var result = {};
            result[types.event] = _getMetadata(types.event);
            result[types.action] = _getMetadata(types.action);
            return result;
        })();

        logger.debug('Assemblers Metadata:', metadata);

        return {
            types: types,
            metadata: metadata,
            Activator: function (type, name) {
                var path = (_metadata[type] && _metadata[type][name] && _metadata[type][name].path) ?
                    _metadata[type][name].path :
                    './' + type + '-' + name + '.js';
                return require(path)(logger);
            }
        };
    };
})();