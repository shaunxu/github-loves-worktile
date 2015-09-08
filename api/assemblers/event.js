(function () {
    'use strict';

    var uuid = require('uuid');
    var async = require('async');
    var _ = require('lodash');

    var Event = function (logger, name, properties) {
        this._logger = logger;
        this._name = name;
        this._properties = properties || {};
    };

    Event.prototype.addProperty = function (property) {
        var self = this;
        var prop = _.assign({}, {
            name: uuid.v4(),
            convert: function (payload, callback) {
                return callback(null, payload.toString());
            },
            required: true,
            defaultValue: null
        }, property);
        self._properties[property.name] = prop;
        return self;
    };

    Event.prototype.getProperties = function () {
        return this._properties;
    };

    Event.prototype.evaluate = function (pid, payload, callback) {
        return callback(true);
    };

    Event.prototype.convert = function (pid, payload, callback) {
        var self = this;
        self.evaluate(pid, payload, function (pass) {
            if (pass) {
                var tasks = [];
                self._properties.forEach(function (property) {
                    tasks.push(function (callback) {
                        property.convert(payload, function (error, value) {
                            if (error) {
                                return callback(error, null);
                            }
                            else {
                                // set default value for all required properties if they are null or undefined
                                // note the value and default are converted to string finally
                                if ((_.isNull(value) || _.isUndefined(value)) && property.required) {
                                    if (_.isNull(property.defaultValue) || _.isUndefined(property.defaultValue)) {
                                        return callback('Required property [' + property.name + '] has no value.', null);
                                    }
                                    else {
                                        return callback(null, {
                                            name: property.name,
                                            value: property.defaultValue.value.toString()
                                        });
                                    }
                                }
                                else {
                                    return callback(null, {
                                        name: property.name,
                                        value: value.toString()
                                    });
                                }
                            }
                        });
                    });
                });
                async.parallel(tasks, function (error, props) {
                    return callback(error, props);
                });
            }
            else {
                return callback(null, null);
            }
        });
    };

    module.exports = Event;
})();