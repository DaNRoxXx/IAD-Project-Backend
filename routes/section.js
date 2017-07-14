var express = require('express');
var router = express.Router();
var model = require('../models');
var section = require('./controllers/section');

router.param("section", function (req, res, next, section) {
    next();
});

router.get('/getall', section.getSections);
router.get('/:section/', section.getSection);
router.get('/:section/students', section.getStudents);
router.get('/:section/activities', section.getActivities);
router.post('/:section/activities', section.addActivity);

router.post('/', section.addSection);

module.exports = router;
