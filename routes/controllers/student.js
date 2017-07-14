var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var errors = require("../../helpers/errors");
var responseHelper = require("../../helpers/response");


var student = {};
var student_params = {};
var campusstudent_params = {};
/**
 * This function add User's as Student's.
 */
student.addStudent = function (req, res, next) {
    if (validator(student_params, req.body)) {
        model.Student.create().then(function (s) {
            model.User.create(req.body).then(function (user) {
                s.setUser(user);
            });
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'Student Added'
            });
        }).catch(function (err) {
            res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
        });
    } else {
        res.status(errors.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
}
/**
 * This function get specific Student matching the ID.
 */
student.getStudent = function (req, res, next) {
    var param = req.params;
    model.Student.find({
        include: [{
                model: model.User,
                as: "User"
            },
            {
                model: model.Section,
                as: "Class"
            }
        ],
        where: {
            id: param.student
        }
    }).then(function (student) {
        if (student) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.json(student);
        } else {
            res.status = errors.HTTP.CODES.BAD_REQUEST;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function get all Student's.
 */
student.getStudents = function (req, res, next) {
    model.Student.findAll({
        include: [{
                model: model.User,
                as: "User"
            },
            /*{
                model: model.Campus,
                as: "Campuses"
            },*/
            {
                model: model.Section,
                as: "Class"
            }
        ]
    }).then(function (students) {
        res.status(errors.HTTP.CODES.SUCCESS);
        res.json(students);
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function edit specific Student matching the ID.
 */
student.editStudent = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Student.find({
            where: {
                id: param.student
            }
        })
        .then(function (s) {
            if (s) {
                s.updateAttributes({
                    firstName: post.firstName ? post.firstName : s.firstName,
                    lastName: post.lastName ? post.lastName : s.lastName,
                    gender: post.gender ? post.gender : s.gender,
                    dob: post.dob ? new Date(post.dob) : s.dob
                });
                res.status = errors.HTTP.CODES.CREATED;
                res.send();
            } else {
                res.status = errors.HTTP.CODES.NOT_FOUND;
                res.send();
            }
        }).catch(function (err) {
            res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
        });;
}
/**
 * This function assign Campus to the Student's.
 */
student.assignCampus = function (req, res, next) {
    if (validator(campusstudent_params, req.body)) {
        model.CampusStudent.create(req.body).then(function () {
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'Student assigned to Campus'
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
 * This function delete Student's.
 */
student.deleteStudent = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Student.destroy({
            where: {
                id: param.student
            }
        })
        .then(function (s) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.send();
        }).catch(function (err) {
            res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
        });
}
/**********************************************************************/
module.exports = student;