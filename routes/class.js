var express = require('express');
var router = express.Router();
var model = require('../models');
var cls = require('./controllers/class');

router.param("class", function (req, res, next, class_) {
    next();
});

router.get('/getall', cls.getAllClasses);
router.put('/edit', cls.editClass);
router.post('/section', cls.addSection);
router.get('/sections/getall', cls.getSections);
router.post('/courses', cls.addCourse);
router.get('/courses/getall', cls.getCourses);

//router.get('/:class/', cls.getClass);
//router.get('/:class/sections', cls.getSections);

module.exports = router;
