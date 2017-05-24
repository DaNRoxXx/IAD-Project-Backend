var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var campus = {};

campus.addCampus = function (req, res, next) {
    var post = req.body;
    model.Campus.create({
        name: post.name,
        address: post.address
    }).then(function () {
        res.status = 201;
        res.send();
    });

}

module.exports = campus;
