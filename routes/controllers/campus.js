var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var campus = {};

var account_params = {
    'amount': "number"
}

var class_params = {}
var campus_params = {}
/**********************************************************************/
campus.addCampus = function (req, res, next) {
    if (validator(campus_params, req.body)) {
        model.Campus.create(req.body).then(function () {
            res.status(constants.HTTP.CODES.CREATED).json({
                message: 'Campus Added'
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
campus.getCampus = function (req, res, next) {
    var param = req.params;
    model.Campus.find({
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        if (campus) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(campus);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });
}
/**********************************************************************/
campus.getCampuses = function (req, res, next) {
    model.Campus.findAll().then(res.send.bind(res))
        .catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
}
/**********************************************************************/
campus.editCampus = function (req, res, next) {
    var post = req.body;

    model.Campus.find({
        where: {
            id: post.id
        }
    }).then(function (update) {
        update.updateAttributes({
            name: post.name,
            address: post.address
        });
        res.status(constants.HTTP.CODES.CREATED).json({
            message: 'Campus Updated'
        });
        res.send();
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;
}
/**********************************************************************/
campus.addAccount = function (req, res, next) {
    var post = req.body;
    var param = req.params;
    model.Campus.find({
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        if (campus) {
            if (validator(account_params, post)) {
                model.Account.create({
                    amount: post.amount
                }).then(function (acc) {
                    acc.setCampus(campus);
                    res.status = constants.HTTP.CODES.CREATED;
                    res.send();
                });
            } else {
                res.status = constants.HTTP.CODES.BAD_REQUEST;
                res.send();
            }
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });;
}
/**********************************************************************/
campus.getAccounts = function (req, res, next) {
    var param = req.params;
    model.Campus.find({
        include: [{
            model: model.Account,
            as: "Accounts"
        }],
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        if (campus) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(campus.Accounts);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });;
}
/**********************************************************************/
campus.addClass = function (req, res, next) {
    model.Campus.find({
        where: {
            id: req.body.campId
        }
    }).then(function (campus) {
        if (campus) {
            if (validator(class_params, req.body)) {
                model.Class.create(req.body).then(function (cls) {
                    cls.setCampus(campus);
                    res.status(constants.HTTP.CODES.CREATED).json({
                        message: 'Class Added'
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
    });;
}
/**********************************************************************/
campus.getClasses = function (req, res, next) {
    var param = req.params;
    model.Campus.find({
        include: [{
            model: model.Class,
            as: "Classes"
        }],
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        if (campus) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(campus.Classes);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });;
}

module.exports = campus;