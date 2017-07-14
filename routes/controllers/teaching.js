var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var errors = require("../../helpers/errors");
var responseHelper = require("../../helpers/response");

var teaching = {};
var teaching_params = {};

teaching.addExam = function (req, res, next) {
    model.Teaching.find({
        where: {
            courseID: req.body.courseId
        }
    }).then(function (teaching) {
        if (teaching) {
            if (validator(teaching_params, req.body)) {
                model.Exam.create(req.body).then(function (exam) {
                    teaching.addExam(exam);
                    res.status(errors.HTTP.CODES.CREATED).json({
                        message: 'Exam Added'
                    });
                    res.send();
                });
            } else {
                res.status(errors.HTTP.CODES.BAD_REQUEST);
                res.send();
            }
        } else {
            res.status(errors.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    });
}

teaching.getExams = function (req, res, next) {
    model.Teaching.findAll({
        include: [{
                model: model.Exam,
                as: "Exam"
            },
            {
                model: model.Course,  
                as: "Course"
            },
            {
                model: model.Section,
                as: "Section"
            }
        ]
    }).then(function (teaching) {
        if (teaching) {
            res.status(errors.HTTP.CODES.SUCCESS);
            res.json(teaching);
        } else {
            res.status(errors.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    });
}


module.exports = teaching;