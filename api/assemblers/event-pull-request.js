(function () {
    'use strict';

    var util = require('util');
    var _ = require('lodash');

    var Event = require('./event.js');

    var EventPullRequest = function (logger) {
        Event.call(this, logger, 'pull-request', 'Pull Request', 'Pull request was created.', null);

        this.addProperty({
            name: 'id',
            displayName: 'ID',
            convert: function (payload, callback) {
                return callback(null, payload.pull_request.id);
            }
        }).addProperty({
            name: 'url',
            displayName: 'URL',
            convert: function (payload, callback) {
                return callback(null, payload.pull_request.html_url);
            }
        }).addProperty({
            name: 'diff_url',
            displayName: 'Diff URL',
            convert: function (payload, callback) {
                return callback(null, payload.pull_request.diff_url);
            }
        }).addProperty({
            name: 'title',
            displayName: 'Title',
            convert: function (payload, callback) {
                return callback(null, payload.pull_request.title);
            }
        }).addProperty({
            name: 'body',
            displayName: 'Content',
            convert: function (payload, callback) {
                return callback(null, payload.pull_request.body);
            }
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

    EventPullRequest.prototype.evaluate = function (pid, payload, callback) {
        return callback(payload.action === 'opened');
    };

    util.inherits(EventPullRequest, Event);
    module.exports = EventPullRequest;
})();