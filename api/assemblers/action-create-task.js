(function () {
    'use strict';

    var util = require('util');
    var _ = require('lodash');

    var Action = require('./action.js');

    var ActionCreateTask = function (logger, worktile, token) {
        Action.call(this, logger, 'create-task', 'Create Task', null, worktile, token);

        this.addTemplate({
            name: 'name',
            displayName: 'Name'
        }).addTemplate({
            name: 'pid',
            displayName: 'Project'
        }).addTemplate({
            name: 'entry_id',
            displayName: 'Entry'
        }).addTemplate({
            name: 'description',
            displayName: 'Content',
            safeString: true
        });
    };

    ActionCreateTask.prototype.onExecute = function (pid, contents, worktile, callback) {

    };

    util.inherits(ActionCreateTask, Action);
    module.exports = ActionCreateTask;
})();