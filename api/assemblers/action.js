(function () {
    'use strict';

    var uuid = require('uuid');
    var async = require('async');
    var Handlebars = require('Handlebars');
    var _ = require('lodash');

    var Action = function (logger, name, displayName, templates, worktile, token) {
        this._logger = logger;
        this._name = name;
        this._displayName = displayName;
        this._templates = templates || {};
        this._worktile = function (path, method, qs, data, callback) {
            worktile.request(token, path, method, qs, data, callback);
        };
    };

    Action.prototype.addTemplate = function (template) {
        var self = this;
        var tpl = _.assign({}, {
            name: uuid.v4(),
            displayName: 'Untitled',
            safeString: false
        }, template);
        self._templates[tpl.name] = tpl;
        return self;
    };

    Action.prototype.getMetadata = function () {
        return {
            name: this._name,
            displayName: this._displayName,
            templates: _.map(this._templates, function (template) {
                return {
                    name: template.name,
                    displayName: template.displayName,
                    safeString: template.safeString
                };
            })
        }
    };

    Action.prototype.execute = function (pid, templates, props, callback) {
        var self = this;
        var safeProps = {};
        // create safe string collection
        _.forEach(props, function (prop) {
            if (_.isNull(prop.value) || _.isUndefined(prop.value)) {
                safeProps[prop.name] = '';
            }
            else {
                safeProps[prop.name] = new Handlebars.SafeString(prop.value);
            }
        });
        // compile templates and generate contents from event properties
        var contents = {};
        _.forEach(self._templates, function (tpl) {
            var template = templates[tpl.name];
            var content = (template && template.content) ? template.content : '';
            contents[tpl.name] = Handlebars.compile(content)(tpl.safeString ? safeProps : props);
        });
        // perform the actual action against worktile
        self.onExecute(pid, contents, self._worktile, callback);
    };

    Action.prototype.onExecute = function (pid, contents, worktile, callback) {
        return callback(null, null);
    };

    module.exports = Action;
})();