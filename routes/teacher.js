var express = require('express');
var router = express.Router();
var model = require('../models');
var teacher = require('./controllers/teacher');

router.param("teacher", function (req, res, next, teacher) {
    next();
});

router.post('/', teacher.addTeacher);
router.get('/getall', teacher.getTeachers);
router.post('/assign', teacher.assignCampus);
router.post('/addcourse', teacher.addCourse);
router.get('/getallcourses', teacher.getCourses);

//router.get('/:teacher/', teacher.getTeacher);
//router.put('/:teacher/', teacher.editTeacher);

module.exports = router;