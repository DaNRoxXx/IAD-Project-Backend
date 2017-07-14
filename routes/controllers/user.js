var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var errors = require("../../helpers/errors");
var responseHelper = require("../../helpers/response");

var user = {};
var user_params = {
    'firstName': 'string',
    'lastName': 'string',
    'gender': 'string',
    'dob': 'string'
}
/**
 * This function add User's.
 */
user.addUser = function (req, res, next) {
    if (validator(user_params, req.body)) {
        model.User.create(req.body).then(function () {
            res.status(errors.HTTP.CODES.CREATED).json({
                message: 'User Added'
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
 * This function get specific User matching the ID.
 */
user.getUser = function (req, res, next) {
    model.User.findOne({
        where: {
            id: req.body.id
        }
    }).then(function (user) {
        if (user) {
            res.send(user);
        } else {
            res.status(errors.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });
}
/**
 * This function get all User's.
 */
user.getAllUsers = function (req, res, next) {
    model.User.findAll().then(res.send.bind(res))
        .catch(function (err) {
            res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
        });
}
/**
 * This function edit specific User matching the ID.
 */
user.editUser = function (req, res, next) {
    model.User.find({
        where: {
            id: req.body.id
        }
    }).then(function (update) {
        update.updateAttributes({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            dob: req.body.dob
        });
        res.status(errors.HTTP.CODES.CREATED).json({
            message: 'User Updated'
        });
        res.send();
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**********************************************************************/
/*user.login = function (req, res, next) {
    model.User.find({
        where: {
            username: post.username,
            password: post.password
        }
    }).then(function (user) {
        if (user) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.send();
            res.json({
                token: "a"
            });
        } else {
            res.status = errors.HTTP.CODES.UNAUTHORIZED;
            res.json(responseHelper.formatResponse(errors.MESSAGE.LOGIN.AUTH_FAILED));
        }

    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;

}*/
module.exports = user;