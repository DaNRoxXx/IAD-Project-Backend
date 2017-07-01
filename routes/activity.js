var express = require('express');
var router = express.Router();
var model = require('../models');
var activity = require('./controllers/activity');

router.param("activity", function (req, res, next, student) {
    next();
});
/* GET <META>  listing. */
router.get('/', activity.getActivities);
/* GET <META>. */
router.get('/:activity/', activity.getActivity);
/* Add <META>. */
router.post('/', activity.addActivity);

module.exports = router;
