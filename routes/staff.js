var express = require('express');
var router = express.Router();
var model = require('../models');
var staff = require('./controllers/staff');

router.param("staff", function (req, res, next, staff) {
    next();
});
/* GET <META>  listing. */
router.get('/', staff.getStaffs);
/* GET <META>. */
router.get('/:staff/', staff.getStaff);
router.put('/:staff/', staff.editStaff);
/* Add <META>. */
router.post('/', staff.addStaff);

module.exports = router;
