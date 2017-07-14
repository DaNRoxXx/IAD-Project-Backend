var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var errors = require("../../helpers/errors");
var responseHelper = require("../../helpers/response");

var teacher = {};
var teacher_params = {};
var course_params = {};
var campusteacher_params = {};
/**
 * This function add User's as Teacher's.
 */
teacher.addTeacher = function (req, res, next) {
    if (validator(teacher_params, req.body)) {
        model.Teacher.create().then(function (s) {
            model.User.create(req.body)
                .then(function (user) {
                    s.setUser(user);
                });
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'Teacher Added'
            });
            res.send();
        }).catch(function (err) {
            res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
        });;
    } else {
        res.status(errors.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
}
/**
 * This function get specific Teacher matching the ID.
 */
teacher.getTeacher = function (req, res, next) {
    var param = req.params;
    model.Teacher.find({
        include: [{
                model: model.User,
                as: "User"
            },
            {
                model: model.Campus,
                as: "Campuses"
            }
        ],
        where: {
            id: param.teacher
        }
    }).then(function (teacher) {
        if (teacher) {
            res.status(errors.HTTP.CODES.SUCCESS);
            res.json(teacher);
        } else {
            res.status(errors.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function get all Teacher's.
 */
teacher.getTeachers = function (req, res, next) {
    model.Teacher.findAll({
        include: [{
            model: model.User,
            as: "User"
        }, {
            model: model.Campus,
            as: "Campuses"
        }]
    }).then(function (teachers) {
        res.status(errors.HTTP.CODES.SUCCESS);
        res.json(teachers);
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });
}
/**
 * This function edit specific Teacher matching the ID.
 */
teacher.editTeacher = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Teacher.find({
        where: {
            id: param.teacher
        }
    }).then(function (s) {
        s.updateAttributes({
            firstName: post.firstName,
            lastName: post.lastName,
            gender: post.gender,
            dob: post.dob
        });
        res.status(errors.HTTP.CODES.UPDATE);
        res.send();
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });
}
/**
 * This function assign Campus to the Teacher's.
 */
teacher.assignCampus = function (req, res, next) {
    if (validator(campusteacher_params, req.body)) {
        model.CampusTeacher.create(req.body).then(function () {
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'Teacher assigned to Campus'
            });
            res.send();
        }).catch(function (err) {
            res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
        });
    } else {
        res.status(errors.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
}
/**
 * This function add Course & Section to Teacher's.
 */
teacher.addCourse = function (req, res, next) {
    if (validator(course_params, req.body)) {
        model.Teaching.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            className: req.body.className
        }).then(function (t) {
            model.Teacher.find({
                where: {
                    id: req.body.teacherId
                }
            }).then(function (teacher) {
                model.Section.find({
                    where: {
                        id: req.body.sectionId
                    }
                }).then(function (section) {
                    model.Course.find({
                        where: {
                            id: req.body.courseId
                        }
                    }).then(function (course) {
                        t.setTeacher(teacher);
                        t.setSection(section);
                        t.setCourse(course);
                        res.status(errors.HTTP.CODES.CREATED).json({
                            message: 'Course & Section assigned to Teacher'
                        });
                        res.send();
                    });
                });
            });
        }).catch(function (err) {
            res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
        });
    } else {
        res.status(errors.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
};
/**
 * This function get all the Courses and Sections assigned to Teacher's.
 */
teacher.getCourses = function (req, res, next) {
    model.Teaching.findAll({
        include: [{
                model: model.Course,
                as: "Course"
            },
            {
                model: model.Section,
                as: "Section"
            }
        ]
    }).then(function (t) {
        if (t) {
            res.status(errors.HTTP.CODES.SUCCESS);
            res.json(t);
        } else {
            res.status(errors.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
};

module.exports = teacher;