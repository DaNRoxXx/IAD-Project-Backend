var express = require('express');
var router = express.Router();
var model = require('../models');
var campus = require('./controllers/campus');

router.param("campus", function (req, res, next, campus) {
    next();
});
/* GET <META>  listing. */
router.get('/', campus.getCampuses);
/* GET <META>. */
router.get('/:campus/', campus.getCampus);
/* */
router.get('/:campus/accounts', campus.getAccounts);
router.post('/:campus/accounts', campus.addAccount);
/* */
router.get('/:campus/classes', campus.getClasses);
router.post('/:campus/classes', campus.addClass);
/* Add <META>. */
router.post('/', campus.addCampus);

module.exports = router;
