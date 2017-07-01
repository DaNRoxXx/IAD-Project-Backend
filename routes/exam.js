var express = require('express');
var router = express.Router();
var model = require('../models');
var exam = require('./controllers/exam');

router.param("exam", function (req, res, next, exam) {
    next();
});
/* GET <META>  listing. */
router.get('/',exam.getExams);
/* GET <META>. */
router.get('/:exam/', exam.getExam);
/* Add <META>. */
router.post('/', exam.addExam);

module.exports = router;
