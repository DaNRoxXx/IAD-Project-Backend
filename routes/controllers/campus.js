var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var campus = {};

var account_params = {
    'amount': "number"
}

var class_params = {

}
var campus_params = {

}
/** 
 *  
 */
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
/** 
 *  
 */
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

/** 
 *  
 */
campus.addClass = function (req, res, next) {
    var post = req.body;
    var param = req.params;
    model.Campus.find({
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        if (campus) {
            if (validator(class_params, post)) {
                model.Class.create({
                    name: post.name,
                    fee: post.fee
                }).then(function (cls) {
                    cls.setCampus(campus);
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
/** 
 *  
 */
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
/** 
 *  
 */
campus.addCampus = function (req, res, next) {
    var post = req.body;
    if (validator(campus_params, post)) {
        model.Campus.create({
            name: post.name,
            address: post.address
        }).then(function (campus) {
            res.status = constants.HTTP.CODES.CREATED;
            res.send();
        });
    } else {
        res.status = constants.HTTP.CODES.BAD_REQUEST;
        res.send();
    }

}
/** 
 *  
 */
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
/** 
 *  
 */
campus.getCampuses = function (req, res, next) {
    model.Campus.findAll().then(function (campuses) {
        res.status = constants.HTTP.CODES.SUCCESS;
        res.json(campuses);
    });
}
module.exports = campus;