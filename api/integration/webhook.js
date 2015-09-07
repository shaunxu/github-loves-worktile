(function () {
    'use strict';

    var _logger = null;
    var _model = null;

    module.exports = function (logger, model) {
        _logger = logger;
        _model = model;

        return {
            inbox: function (req, res, callback) {
                var uid = req.query.uid;
                var cid = req.query.cid;
                var tid = req.query.tid;

                if (uid && cid && tid) {
                    // todo: find a trigger from database
                    var trigger = {};

                    if (trigger) {
                        if (trigger.enabled) {
                            // todo: create assembler

                        }
                        else {
                            logger.debug('Trigger [' + trigger.name + '] is disabled.');
                            res.status(204).send('Ignore this webhook event since the trigger is disabled.');
                        }
                    }
                    else {
                        logger.error('Cannot find trigger in database specified. \n' + JSON.stringify(req.query, null, 2));
                        res.status(400).send('Cannot find trigger specified.');
                    }
                }
                else {
                    logger.error('Arguments in query string were not specified. \n' + JSON.stringify(req.query, null, 2));
                    res.status(400).send('Arguments not specified.');
                }
            }
        };
    };
})();