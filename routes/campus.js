var express = require('express');
var router = express.Router();
var model = require('../models');
var campus = require('./controllers/campus');

router.param("campus", function (req, res, next, campus) {
    next();
});

router.post('/', campus.addCampus);
router.get('/getall', campus.getCampuses);
router.put('/edit', campus.editCampus);
router.post('/class', campus.addClass);

//router.get('/:campus/', campus.getCampus);
//router.get('/:campus/accounts', campus.getAccounts);
//router.post('/:campus/accounts', campus.addAccount);
//router.get('/:campus/classes', campus.getClasses);

module.exports = router;
