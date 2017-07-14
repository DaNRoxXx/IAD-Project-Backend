var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var errors = require("../../helpers/errors");
var responseHelper = require("../../helpers/response");

var exam = {};
var exam_params = {};
/** 
 *  This function add Exam's.
 */
exam.addExam = function (req, res, next) {
    if (validator(exam_params, req.body)) {
        model.Exam.create({
            time: req.body.time,
            courseID: req.body.courseID
        }).then(function () {
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'Exam Added'
            });
            res.send();
        });
    } else {
        res.status(errors.HTTP.CODES.NOT_FOUND);
        res.send();
    }
}
/** 
 *  This function get all Exam's.
 */
exam.getExam = function (req, res, next) {
    var param = req.params;
    model.Exam.find({
        where: {
            id: param.exam
        }
    }).then(function (exam) {
        if (exam) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.json(exam);
        } else {
            res.status = errors.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });
}
/** 
 *  This function get specific Exam matching the ID.
 */
exam.getExams = function (req, res, next) {
    model.Exam.findAll({
        include: [{
            model: model.Teaching,
            as: "Course"
        }]
    }).then(function (exams) {
        res.status(errors.HTTP.CODES.SUCCESS);
        res.json(exams);
    });
}


module.exports = exam;