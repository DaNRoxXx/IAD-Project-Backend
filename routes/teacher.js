var express = require('express');
var router = express.Router();
var model = require('../models');
var teacher = require('./controllers/teacher');

router.param("teacher", function (req, res, next, teacher) {
    next();
});

router.post('/', teacher.addTeacher);
router.get('/get', teacher.getTeachers);
router.post('/assign', teacher.assignCampus);

//router.get('/:teacher/courses', teacher.getCourses);
//router.post('/:teacher/courses', teacher.addCourse);
//router.get('/:teacher/', teacher.getTeacher);
//router.put('/:teacher/', teacher.editTeacher);

module.exports = router;