var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");

var signup = {};

signup.info = function (req, res, next) {
    var post = req.body;
    model.signup.create({
        userName: post.userName,
        email: post.email,
        password: post.password
    }).then(function () {
        res.status = 201;
        res.send();
    });
}

signup.login = function (req, res, next) {
    User.find({}, function(err, users) {
    res.json(users);
  });
}

/*signup.login = function (req, res, next) {
    var post = req.body;
    model.signup.find({
        where: {
            //userName: post.userName,
            email: post.email,
            //password: post.password
        }
    }).then(function () {
        res.status = 201;
        res.send();
    });
}*/

/*signup.login = function (req, res, next) {
    var param = req.params;
    model.signup.find({
        where: {
            email: param.signup
            //password: param.signup
        }
    }).then(function (signup) {
        res.json(signup);
    });
}
/*signup.login = function (req, res, next) {
    model.Users.find({
            where: {
                Username: post.username,
                password: post.password
            },
            include: [{
                model: model.User_type,
                as: "UserType"
            }]
        })
        .then(function (User) {
            if (User == null) {

                res.Status = constants.HTTP.CODES.SUCCESS;
                res.send(responseHelper.Response(
                    constants.MESSAGES.VIEW.NO_DATA,
                    User, 'Failure'

                ));
            } else {
                var userss = {
                    username: User.Username,
                    password: User.password
                }
                var token = jwt.sign(userss, process.env.SECRET_KEY, {});
                res.Status = constants.HTTP.CODES.SUCCESS;
                res.send(responseHelper.Response(
                    User,
                    token, 'Success'

                ));
            }


        });
}*/

module.exports = signup;