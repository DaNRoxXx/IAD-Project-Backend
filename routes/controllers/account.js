var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");

var account = {}
/** 
 *  This function get specific Account matching ID.
 */
account.getAccount = function (req, res, next) {
    var param = req.params;
    model.Account.find({
        where: {
            id: param.account
        }
    }).then(function (account) {
        if (account) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.json(account);
        } else {
            res.status = constants.HTTP.CODES.NOT_FOUND;
            res.send();
        }
    });
}
/** 
 *  This Fuction get all Account's.
 */
account.getAccounts = function (req, res, next) {
    model.Account.findAll().then(function (accounts) {
        res.status = constants.HTTP.CODES.SUCCESS;
        res.json(accounts);
    });
}
module.exports = account;