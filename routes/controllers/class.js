var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");

var cls = {};
var section_params = {};
var class_params = {};

/**
 * This function get specific Class matching the ID.
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
 * This function get all Classes.
 */
cls.getAllClasses = function (req, res, next) {
    model.Class.findAll({
            include: [{
                model: model.Campus,
                as: "Campus"
            }]
        }).then(res.send.bind(res))
        .catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
}
/**
 * This function edit specific Class matching the ID.
 */
cls.editClass = function (req, res, next) {
    var post = req.body;

    model.Class.find({
        where: {
            id: post.id
        }
    }).then(function (update) {
        update.updateAttributes({
            name: post.name,
            fee: post.fee
        });
        res.status(constants.HTTP.CODES.CREATED).json({
            message: 'Class Updated'
        });
        res.send();
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function assign Course to Class.
 */
cls.addCourse = function (req, res, next) {
    model.Class.find({
        where: {
            id: req.body.classId
        }
    }).then(function (cls) {
        if (cls) {
            model.Course.find({
                where: {
                    id: req.body.courseId
                }
            }).then(function (course) {
                if (course) {
                    cls.addCourse(course);
                    res.status(constants.HTTP.CODES.UPDATE).json({
                        message: 'Course Assigned'
                    });
                } else {
                    res.status(constants.HTTP.CODES.NOT_FOUND);
                    res.send();
                }
            });
        } else {
            res.status(constants.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    });
}
/**
 * This function get specific Course matching the Class.
 */
cls.getCourses = function (req, res, next) {
    model.Class.find({
        include: [{
            model: model.Course,
            as: "Courses"
        }]
    }).then(function (cls) {
        if (cls) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(cls.Courses);
        } else {
            res.status(constants.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    });
}
/**
 * This function add Section's.
 */
cls.addSection = function (req, res, next) {
    model.Class.find({
        where: {
            id: req.body.classId
        }
    }).then(function (cls) {
        if (cls) {
            if (validator(section_params, req.body)) {
                model.Section.create(req.body).then(function (section) {
                    cls.addSection(section);
                    res.status(constants.HTTP.CODES.CREATED).json({
                        message: 'Section Added'
                    });
                    res.send();
                });
            } else {
                res.status(constants.HTTP.CODES.BAD_REQUEST);
                res.send();
            }
        } else {
            res.status(constants.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    });
}
/**
 * This function get all Section's.
 */
cls.getSections = function (req, res, next) {
    var param = req.params;
    model.Class.findAll({
        include: [{
            model: model.Section,
            as: "Sections"
        }]
    }).then(function (cls) {
        if (cls) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(cls);
        } else {
            res.status(constants.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    });
}

module.exports = cls;