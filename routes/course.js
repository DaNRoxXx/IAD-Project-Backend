var express = require('express');
var router = express.Router();
var model = require('../models');
var course = require('./controllers/course');

router.param("course", function (req, res, next, course) {
    next();
});

router.post('/', course.addCourse);
router.get('/get', course.getCourses);
router.put('/edit', course.editCourse);
/* GET <META>. */
//router.get('/:course/', course.getCourse);
//router.get('/:course/teachers', course.getTeaching);
/* Add <META>. */
module.exports = router;
