var express = require('express');
var router = express.Router();
var model = require('../models');
var signup = require('./controllers/signup');

router.param("signup", function (req, res, next, signup) {
    next();
});

router.post('/', signup.info);
router.get('/login', signup.login);

module.exports = router;