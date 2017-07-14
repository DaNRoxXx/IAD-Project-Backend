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
router.post('/activity', section.addActivity);
router.get('/activity/getall', section.getActivities);

router.post('/', section.addSection);

module.exports = router;
