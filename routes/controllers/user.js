var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");

var user = {};
var user_params = {
    'firstName': 'string',
    'lastName': 'string',
    'gender': 'string',
    'dob': 'string'
}
/**********************************************************************/
user.addUser = function (req, res, next) {
    if (validator(user_params, req.body)) {
        model.User.create(req.body).then(function () {
            //res.sendStatus(constants.HTTP.CODES.Cconstants.HTTP.CODES.CREATEDREATED);
            /*res.status(constants.HTTP.CODES.CREATED);*/
            res.status(constants.HTTP.CODES.CREATED).json({
                message: 'User Added'
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
user.getUser = function (req, res, next) {
    model.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        if (user) {
            res.send(user);
        } else {
            res.status(constants.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}

/**********************************************************************/
user.getAllUsers = function (req, res, next) {
    model.User.findAll().then(res.send.bind(res))
        .catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
}
/**********************************************************************/
user.editUser = function (req, res, next) {
    var post = req.body;

    model.User.find({
        where: {
            id: post.id
        }
    }).then(function (update) {
        update.updateAttributes({
            firstName: post.firstName,
            lastName: post.lastName,
            gender: post.gender,
            dob: post.dob
        });
        res.status(constants.HTTP.CODES.CREATED).json({
            message: 'User Updated'
        });
        res.send();
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
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
            res.status = constants.HTTP.CODES.SUCCESS;
            res.send();
            res.json({
                token: "a"
            });
        } else {
            res.status = constants.HTTP.CODES.UNAUTHORIZED;
            res.json(responseHelper.formatResponse(constants.MESSAGE.LOGIN.AUTH_FAILED));
        }

    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;

}*/
module.exports = user;