var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var course = {};
var course_params={};

/** 
 *  
*/
course.addCourse = function (req, res, next) {
    var post = req.body;
    if (validator(course_params, post)) {
        model.Course.create({
            name: post.name
        }).then(function () {
            res.status = res.status = constants.HTTP.CODES.CREATED;
            res.send();
        });
    } else {
        res.status = constants.HTTP.CODES.BAD_REQUEST;
        res.send();
    }
}
/** 
 *  
*/
course.getCourse = function (req, res, next) {
    var param = req.params;
    model.Course.find({
        where: {
            id: param.course
        }
    }).then(function (course) {
        if (course) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(course);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send
        }
    });
}
/** 
 *  
*/
course.getCourses = function (req, res, next) {
    model.Course.findAll().then(function (Courses) {
        res.status = constants.HTTP.CODES.SUCCESS;
        res.json(Courses);
    });
}
course.getTeaching = function (req, res, next) {
    param = req.params;
    model.Teaching.findAll({
        where: { courseId: param.course },
        include: [
            { model: model.Teacher, as: "Teacher" },
            { model: model.Section, as: "Section" }
        ]
    }).then(function (teaching) {
        if (teaching){
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(teaching);
        }
        else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send()
        }
    })

}

module.exports = course;
