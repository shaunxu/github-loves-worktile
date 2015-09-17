(function () {
    'use strict';

    var util = require('util');
    var _ = require('lodash');

    var Action = require('./action.js');

    var ActionCreateTopic = function (logger, worktile, token) {
        Action.call(this, logger, 'create-topic', 'Create Topic', null, worktile, token);

        this.addTemplate({
            name: 'name',
            displayName: 'Name'
        }).addTemplate({
            name: 'pid',
            displayName: 'Project'
        }).addTemplate({
            name: 'content',
            displayName: 'Content',
            safeString: true
        });
    };

    ActionCreateTopic.prototype.onExecute = function (pid, contents, worktile, callback) {

    };

    util.inherits(ActionCreateTopic, Action);
    module.exports = ActionCreateTopic;
})();