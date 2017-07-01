var express = require('express');
var router = express.Router();
var model = require('../models');
var section = require('./controllers/section');

router.param("section", function (req, res, next, section) {
    next();
});
/* GET <META>  listing. */
router.get('/', section.getSections);
/* GET <META>. */
router.get('/:section/', section.getSection);

router.get('/:section/students', section.getStudents);
router.get('/:section/activities', section.getActivities);
router.post('/:section/activities', section.addActivity);

/* Add <META>. */
router.post('/', section.addSection);

module.exports = router;
