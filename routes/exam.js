var express = require('express');
var router = express.Router();
var model = require('../models');
var exam = require('./controllers/exam');

router.param("exam", function (req, res, next, exam) {
    next();
});

router.post('/', exam.addExam);
router.get('/getall',exam.getExams);

//router.get('/:exam/', exam.getExam);

module.exports = router;
