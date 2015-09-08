(function () {
    'use strict';

    var util = require('util');
    var _ = require('lodash');

    var Event = require('./event.js');

    var EventIssueOpened = function (logger) {
        Event.call(this, logger, 'issue-opened', null);

        this.addProperty({
            name: 'id',
            convert: function (payload, callback) {
                return callback(null, payload.issue.id);
            }
        }).addProperty({
            name: 'url',
            convert: function (payload, callback) {
                return callback(null, payload.issue.html_url);
            }
        }).addProperty({
            name: 'title',
            convert: function (payload, callback) {
                return callback(null, payload.issue.title);
            }
        }).addProperty({
            name: 'body',
            convert: function (payload, callback) {
                return callback(null, payload.issue.body);
            }
        }).addProperty({
            name: 'labels',
            convert: function (payload, callback) {
                return callback(null, _.map(payload.issue.labels, function (label) {
                    return label.name;
                }).join(', '));
            },
            required: false
        }).addProperty({
            name: 'repository_name',
            convert: function (payload, callback) {
                return callback(null, payload.repository.full_name);
            }
        }).addProperty({
            name: 'repository_url',
            convert: function (payload, callback) {
                return callback(null, payload.repository.html_url);
            }
        }).addProperty({
            name: 'sender',
            convert: function (payload, callback) {
                return callback(null, payload.sender.login);
            }
        }).addProperty({
            name: 'sender_Url',
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