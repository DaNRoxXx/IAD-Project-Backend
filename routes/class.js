var express = require('express');
var router = express.Router();
var model = require('../models');
var cls = require('./controllers/class');

router.param("class", function (req, res, next, class_) {
    next();
});

router.get('/get', cls.getAllClasses);
router.put('/edit', cls.editClass);
router.post('/section', cls.addSection);
router.get('/sections/get', cls.getSections);
/* GET <META>. */
//router.get('/:class/', cls.getClass);
/* Add <META>. */
//router.get('/:class/courses', cls.getCourses);
//router.post('/:class/courses', cls.addCourse);
/* */
//router.get('/:class/sections', cls.getSections);

module.exports = router;
