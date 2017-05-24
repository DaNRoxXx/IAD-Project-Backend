var express = require('express');
var router = express.Router();
var model = require('../models');
var campus = require('./controllers/campus');

router.param("campus", function (req, res, next, campus) {
    next();
});

router.post('/', campus.addCampus);

module.exports = router;
