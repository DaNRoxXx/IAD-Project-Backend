var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var errors = require("../../helpers/errors");
var responseHelper = require("../../helpers/response");

var course = {};
var course_params = {};
/**
 * This function add Courses.
 */
course.addCourse = function (req, res, next) {
    if (validator(course_params, req.body)) {
        model.Course.create(req.body).then(function () {
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'Course Added'
            });
            res.send();
        });
    } else {
        res.status(errors.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
}
/**
 * This function get specific Course matching the ID.
 */
course.getCourse = function (req, res, next) {
    var param = req.params;
    model.Course.find({
        where: {
            id: param.course
        }
    }).then(function (course) {
        if (course) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.json(course);
        } else {
            res.status = errors.HTTP.CODES.NOT_FOUND;
            res.send
        }
    });
}
/**
 * This function get all Courses.
 */
course.getCourses = function (req, res, next) {
    model.Course.findAll({
        include: [{
            model: model.Class,
            as: "Classes"
        }]
    }).then(function (Courses) {
        res.status = errors.HTTP.CODES.SUCCESS;
        res.json(Courses);
    });
}
/**
 * This function edit specific Course matching the ID.
 */
course.editCourse = function (req, res, next) {
    model.Course.find({
        where: {
            id: req.body.id
        }
    }).then(function (update) {
        update.updateAttributes({
            name: req.body.name,
        });
        res.status(errors.HTTP.CODES.CREATED).json({
            message: 'Course Updated'
        });
        res.send();
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function get all Teaching's.
 */
course.getTeaching = function (req, res, next) {
    param = req.params;
    model.Teaching.findAll({
        where: {
            courseId: param.course
        },
        include: [{
                model: model.Teacher,
                as: "Teacher"
            },
            {
                model: model.Section,
                as: "Section"
            }
        ]
    }).then(function (teaching) {
        if (teaching) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.json(teaching);
        } else {
            res.status = errors.HTTP.CODES.NOT_FOUND;
            res.send()
        }
    })
}
/**********************************************************************/
module.exports = course;