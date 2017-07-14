var express = require('express');
var router = express.Router();
var model = require('../models');
var teaching = require('./controllers/teaching');

router.param("teaching", function (req, res, next, teaching) {
    next();
});

router.post('/exam', teaching.addExam)
router.get('/exam/getall', teaching.getExams);
/*router.post('/', teacher.addTeacher);
router.get('/getall', teacher.getTeachers);
router.post('/assign', teacher.assignCampus);
router.post('/addcourse', teacher.addCourse);
router.get('/getallcourses', teacher.getCourses);*/

//router.get('/:teacher/', teacher.getTeacher);
//router.put('/:teacher/', teacher.editTeacher);

module.exports = router;