var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var staff = {};
var staff_params = {};
var campusstaff_params = {};
/**********************************************************************/
staff.addStaff = function (req, res, next) {
    if (validator(staff_params, req.body)) {
        model.Staff.create().then(function (s) {
            model.User.create(req.body).then(function (user) {
                s.setUser(user);
            });
            res.status(constants.HTTP.CODES.CREATED).json({
                message: 'Staff Added'
            });
        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
    } else {
        res.status(constants.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
}
/**********************************************************************/
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
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(staff);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/**********************************************************************/
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
        res.status = constants.HTTP.CODES.SUCCESS;
        res.json(staffs);
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/**********************************************************************/
staff.assignCampus = function (req, res, next) {
    if (validator(campusstaff_params, req.body)) {
        model.CampusStaff.create(req.body).then(function () {
            res.status(constants.HTTP.CODES.CREATED).json({
                message: 'Staff assigned to Campus'
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
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;
}
/**********************************************************************/
module.exports = staff;