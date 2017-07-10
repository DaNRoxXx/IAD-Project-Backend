var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var section = {};
var activity_params = {};
var section_params = {};
/**********************************************************************/
section.addSection = function (req, res, next) {
    var post = req.body;
    if (validator(section_params, post)) {
        model.Section.create({
            number: post.number
        }).then(function () {
            res.status = constants.HTTP.CODES.CREATED;
            res.send();
        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });;
    } else {
        res.status = constants.HTTP.CODES.BAD_REQUEST;
        res.send();
    }
}
/**********************************************************************/
section.getStudents = function (req, res, next) {

    var param = req.params;
    model.Section.find({
        where: {
            id: param.section
        },
        include: [{
            model: model.Student,
            as: "Students"
        }]
    }).then(function (section) {
        if (section) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(section);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/**********************************************************************/
section.getActivities = function (req, res, next) {

    var param = req.params;
    model.Activity.findAll({
        where: {
            sectionId: param.section
        }
    }).then(function (section) {
        if (section) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(section);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/**********************************************************************/
section.addActivity = function (req, res, next) {
    var param = req.params;
    var post = req.body;
    model.Section.find({
        where: {
            id: param.section
        }
    }).then(function (section) {
        if (section) {
            if (validator(activity_params, post)) {
                model.Activity.create({
                    date: post.date ? new Date(post.date) : null,
                    description: post.description
                }).then(function (activity) {
                    activity.setSection(section);
                    res.status = constants.HTTP.CODES.CREATED;
                    res.send();
                }).catch(function (err) {
                    res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
                });
            } else {
                res.status = constants.HTTP.CODES.BAD_REQUEST;
                res.send();
            }
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();

        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;

}
/**********************************************************************/
section.getSection = function (req, res, next) {
    var param = req.params;
    model.Section.find({
        where: {
            id: param.section
        }
    }).then(function (section) {
        if (section) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(section);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;
}
/**********************************************************************/
section.getSections = function (req, res, next) {
    model.Section.findAll().then(function (sections) {
        res.status = constants.HTTP.CODES.SUCCESS;
        res.json(sections);
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;
}
module.exports = section;