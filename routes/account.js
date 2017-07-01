var express = require('express');
var router = express.Router();
var model = require('../models');
var account = require('./controllers/account');

router.param("account", function (req, res, next, student) {
    next();
});
/* GET <META>  listing. */
router.get('/', account.getAccounts);
/* GET <META>. */
router.get('/:account/', account.getAccount);

module.exports = router;
