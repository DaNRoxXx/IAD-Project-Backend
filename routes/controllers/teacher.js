var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");

var teacher = {};
var teacher_params = {};
var course_params = {};
var campusteacher_params = {};
/**********************************************************************/
teacher.addTeacher = function (req, res, next) {
    if (validator(teacher_params, req.body)) {
        model.Teacher.create().then(function (s) {
            model.User.create(req.body)
                .then(function (user) {
                    s.setUser(user);
                });
            res.status(constants.HTTP.CODES.CREATED).json({
                message: 'Teacher Added'
            });
            res.send();
        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });;
    } else {
        res.status(constants.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
}
/**********************************************************************/
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
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(teacher);
        } else {
            res.status(constants.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;
}
/**********************************************************************/
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
        res.status(constants.HTTP.CODES.SUCCESS);
        res.json(teachers);
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/**********************************************************************/
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
        res.status(constants.HTTP.CODES.UPDATE);
        res.send();
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/**********************************************************************/
teacher.assignCampus = function (req, res, next) {
    if (validator(campusteacher_params, req.body)) {
        model.CampusTeacher.create(req.body).then(function () {
            res.status(constants.HTTP.CODES.CREATED).json({
                message: 'Teacher assigned to Campus'
            });
            res.send();
        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
    } else {
        res.status(constants.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
}
/**********************************************************************/
teacher.getCourses = function (req, res, next) {
    var param = req.params;
    model.Teaching.findAll({
        where: {
            TeacherId: param.teacher
        },
        include: [{
                model: model.Course,
                as: "Course"
            },
            {
                model: model.Section,
                as: "Section"
            },
        ]
    }).then(function (t) {
        if (t) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(t);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;
};
/**********************************************************************/
teacher.addCourse = function (req, res, next) {
    var param = req.params;
    var post = req.body;
    if (validator(course_params, post)) {
        model.Teaching.create().then(function (t) {
            model.Teacher.find({
                where: {
                    id: param.teacher
                }
            }).then(function (teacher) {
                model.Section.find({
                    where: {
                        id: post.sectionId
                    }
                }).then(function (section) {
                    model.Course.find({
                        where: {
                            id: post.courseId
                        }
                    }).then(function (course) {
                        t.setTeacher(teacher);
                        t.setSection(section);
                        t.setCourse(course);
                        res.status(constants.HTTP.CODES.CREATED);
                        res.send();
                    });
                });
            });
        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
    } else {
        res.status = constants.HTTP.CODES.BAD_REQUEST;
        res.send();
    }
};
/**********************************************************************/

module.exports = teacher;