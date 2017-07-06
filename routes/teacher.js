var express = require('express');
var router = express.Router();
var model = require('../models');
var teacher = require('./controllers/teacher');

router.param("teacher", function (req, res, next, teacher) {
    next();
});
/* GET <META>  listing. */
router.get('/get', teacher.getTeachers);
/* GET <META>. */
//router.get('/:teacher/', teacher.getTeacher);
//router.put('/:teacher/', teacher.editTeacher);
/* Add <META>. */
router.post('/', teacher.addTeacher);

//router.get('/:teacher/courses', teacher.getCourses);
//router.post('/:teacher/courses', teacher.addCourse);
module.exports = router;
