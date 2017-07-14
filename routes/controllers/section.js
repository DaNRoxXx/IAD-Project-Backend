var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var errors = require("../../helpers/errors");
var responseHelper = require("../../helpers/response");

var section = {};
var activity_params = {};
var section_params = {};
/**
 * This function add Section's.
 */
section.addSection = function (req, res, next) {
    var post = req.body;
    if (validator(section_params, post)) {
        model.Section.create({
            number: post.number
        }).then(function () {
            res.status = errors.HTTP.CODES.CREATED;
            res.send();
        }).catch(function (err) {
            res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
        });;
    } else {
        res.status = errors.HTTP.CODES.BAD_REQUEST;
        res.send();
    }
}
/**
 * This function get specific Section matching the ID.
 */
section.getSection = function (req, res, next) {
    var param = req.params;
    model.Section.find({
        where: {
            id: param.section
        }
    }).then(function (section) {
        if (section) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.json(section);
        } else {
            res.status = errors.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function get all Section's.
 */
section.getSections = function (req, res, next) {
    model.Section.findAll({
        include: [{
            model: model.Class,
            as: "Class"
        }]
    }).then(function (sections) {
        res.status = errors.HTTP.CODES.SUCCESS;
        res.json(sections);
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function get specific Student matching the ID.
 */
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
            res.status(errors.HTTP.CODES.SUCCESS);
            res.json(section);
        } else {
            res.status(errors.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });
}
/**
 * This function get add Activities to the Section.
 */
section.addActivity = function (req, res, next) {
    model.Section.find({
        where: {
            id: req.body.section
        }
    }).then(function (section) {
        if (section) {
            if (validator(activity_params, req.body)) {
                model.Activity.create({
                    date: req.body.date,
                    description: req.body.description
                }).then(function (activity) {
                    activity.setSection(section);
                    res.status(errors.HTTP.CODES.CREATED).json({
                        message: 'Activity Added'
                    });
                    res.send();
                }).catch(function (err) {
                    res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
                });
            } else {
                res.status(errors.HTTP.CODES.BAD_REQUEST);
                res.send();
            }
        } else {
            res.status(errors.HTTP.CODES.NOT_FOUND);
            res.send();

        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });;
}
/**
 * This function get specific Activity matching the Section.
 */
section.getActivities = function (req, res, next) {

    //var param = req.params;
    model.Activity.findAll({
        include: [{
            model: model.Section,
            as: "Section"
        }]
    }).then(function (section) {
        if (section) {
            res.status = errors.HTTP.CODES.SUCCESS;
            res.json(section);
        } else {
            res.status = errors.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(errors.HTTP.CODES.SERVER_ERROR);
    });
}

module.exports = section;