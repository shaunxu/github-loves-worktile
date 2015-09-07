(function () {
    'use strict';

    var util = require('util');
    var Assembler = require('./assembler.js');

    var AssemblerIssueOpened = function (logger, worktile) {
        Assembler.call(this, logger, worktile, 'issue-opened');
    };

    util.inherits(AssemblerIssueOpened, Assembler);
    module.exports = AssemblerIssueOpened;
})();