var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var errors = require("../../helpers/errors");
var responseHelper = require("../../helpers/response");


var staff = {};
var staff_params = {};
var campusstaff_params = {};
/**
 * This function add User's as Staff's.
 */
staff.addStaff = function (req, res, next) {
    if (validator(staff_params, req.body)) {
        model.Staff.create({
            administrator: req.body.administrator,
            username: req.body.username,
            password: req.body.password
        }).then(function (s) {
            model.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                dob: req.body.dob
            }).then(function (user) {
                s.setUser(user);
            });
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'Staff Added'
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
 * This function get specific Staff matching the ID.
 */
staff.getStaff = function (req, res, next) {
    var param = req.params;

    model.Staff.find({
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
            id: param.staff
        }
    }).then(function (staff) {
        if (staff) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.json(staff);
        } else {
            res.status = errors.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });
}
/**
 * This function get all Staff's.
 */
staff.getStaffs = function (req, res, next) {
    model.Staff.findAll({
        include: [{
                model: model.User,
                as: "User"
            },
            {
                model: model.Campus,
                as: "Campuses"
            }
        ]
    }).then(function (staffs) {
        res.status = errors.HTTP.CODES.SUCCESS;
        res.json(staffs);
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });
}
/**
 * This function edit specific Staff matching the ID.
 */
staff.editStaff = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Staff.find({
        where: {
            id: param.staff
        }
    }).then(function (s) {
        s.updateAttributes({
            firstName: post.firstName,
            lastName: post.lastName,
            gender: post.gender,
            dob: post.dob
        });
        res.status(201);
        res.send();
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function assign Campus to the Staff's.
 */
staff.assignCampus = function (req, res, next) {
    if (validator(campusstaff_params, req.body)) {
        model.CampusStaff.create(req.body).then(function () {
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'Staff assigned to Campus'
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
 * This function check staff credential's at login.
 */
staff.staffLogin = function (req, res, next) {
    model.Staff.find({
        include: [{
            model: model.User,
            as: "User"
        }],
        where: {
            username: req.body.username,
            password: req.body.password,
            administrator: true
        }
    }).then(function (staff) {
        if (staff) {
            res.status(errors.HTTP.CODES.SUCCESS).json({
                message: 'Successfully Logged In'
            });
            res.send();
        } else {
            res.status(203).json({
                message: 'Staff not found'
            }); // Not found
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });
}

module.exports = staff;