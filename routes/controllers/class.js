var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var cls = {};
var section_params={}
/** 
 *  
*/
cls.getClass = function (req, res, next) {
    var param = req.params;
    model.Class.find({
        where: {
            id: param.class
        }
    }).then(function (cls) {
        if (cls) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(cls);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });
}
/** 
 *  
*/
cls.getClasses = function (req, res, next) {
    model.Class.findAll().then(function (classes) {
        res.status = constants.HTTP.CODES.SUCCESS;
        res.json(classes);
    });
}
/** 
 *  
*/
cls.addCourse = function (req, res, next) {
    var post = req.body;
    var param = req.params;
    model.Class.find({
        where: {
            id: param.class
        }
    }).then(function (cls) {
        if (cls) {
            model.Course.find({
                where: {
                    id: post.courseId
                }
            }).then(function (course) {
                if (course) {
                    cls.addCourse(course);
                    res.status = constants.HTTP.CODES.UPDATE;
                    res.send();
                }
                else {
                    res.status = constants.HTTP.CODES.NOT_FOUND;
                    res.send();
                }
            });
        }
        else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res, send();
        }
    });
}
/** 
 *  
*/
cls.getCourses = function (req, res, next) {
    var param = req.params;
    model.Class.find({
        include: [
            { model: model.Course, as: "Courses" }
        ],
        where: {
            id: param.class
        }
    }).then(function (cls) {
        if (cls) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(cls.Courses);
        }
        else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });
}
/** 
 *  
*/
cls.addSection = function (req, res, next) {
    var post = req.body;
    var param = req.params;
    model.Class.find({
        where: {
            id: param.class
        }
    }).then(function (cls) {
        if (cls) {
            if (validator(section_params, post)) {
                model.Section.create({
                    number: post.number
                }).then(function (section) {
                    cls.addSection(section);
                    res.status = constants.HTTP.CODES.SUCCESS;
                    res.send();
                });
            }
            else {
                res.status = constants.HTTP.CODES.BAD_REQUEST;
                res.send();
            }
        }
        else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });
}
/** 
 *  
*/
cls.getSections = function (req, res, next) {
    var param = req.params;
    model.Class.find({
        include: [
            { model: model.Section, as: "Sections" }
        ],
        where: {
            id: param.class
        }
    }).then(function (cls) {
        if (cls) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(cls.Sections);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });
}

module.exports = cls;
