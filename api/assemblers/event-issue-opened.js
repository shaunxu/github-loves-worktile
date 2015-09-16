(function () {
    'use strict';

    var util = require('util');
    var _ = require('lodash');

    var Event = require('./event.js');

    var EventIssueOpened = function (logger) {
        Event.call(this, logger, 'issue-opened', 'Issue Created', 'User opened (created) a new issue.', null);

        this.addProperty({
            name: 'id',
            displayName: 'ID',
            convert: function (payload, callback) {
                return callback(null, payload.issue.id);
            }
        }).addProperty({
            name: 'url',
            displayName: 'URL',
            convert: function (payload, callback) {
                return callback(null, payload.issue.html_url);
            }
        }).addProperty({
            name: 'title',
            displayName: 'Title',
            convert: function (payload, callback) {
                return callback(null, payload.issue.title);
            }
        }).addProperty({
            name: 'body',
            displayName: 'Content',
            convert: function (payload, callback) {
                return callback(null, payload.issue.body);
            }
        }).addProperty({
            name: 'labels',
            displayName: 'Labels',
            convert: function (payload, callback) {
                return callback(null, _.map(payload.issue.labels, function (label) {
                    return label.name;
                }).join(', '));
            },
            required: false
        }).addProperty({
            name: 'repository_name',
            displayName: 'Repository',
            convert: function (payload, callback) {
                return callback(null, payload.repository.full_name);
            }
        }).addProperty({
            name: 'repository_url',
            displayName: 'Repository URL',
            convert: function (payload, callback) {
                return callback(null, payload.repository.html_url);
            }
        }).addProperty({
            name: 'sender',
            displayName: 'Sender',
            convert: function (payload, callback) {
                return callback(null, payload.sender.login);
            }
        }).addProperty({
            name: 'sender_Url',
            displayName: 'Sender URL',
            convert: function (payload, callback) {
                return callback(null, payload.sender.html_url);
            }
        });
    };

    EventIssueOpened.prototype.evaluate = function (pid, payload, callback) {
        return callback(payload.action === 'opened');
    };

    util.inherits(EventIssueOpened, Event);
    module.exports = EventIssueOpened;
})();