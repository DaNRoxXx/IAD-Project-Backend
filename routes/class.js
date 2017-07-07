var express = require('express');
var router = express.Router();
var model = require('../models');
var cls = require('./controllers/class');

router.param("class", function (req, res, next, class_) {
    next();
});
/* GET <META>  listing. */
router.get('/get', cls.getClasses);
/* GET <META>. */
router.get('/:class/', cls.getClass);
/* Add <META>. */
router.get('/:class/courses', cls.getCourses);
router.post('/:class/courses', cls.addCourse);
/* */
router.get('/:class/sections', cls.getSections);
router.post('/:class/sections', cls.addSection);
module.exports = router;
