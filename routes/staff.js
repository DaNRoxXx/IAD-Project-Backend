var express = require('express');
var router = express.Router();
var model = require('../models');
var staff = require('./controllers/staff');

router.param("staff", function (req, res, next, staff) {
    next();
});

router.post('/', staff.addStaff);
router.get('/get', staff.getStaffs);
router.post('/assign', staff.assignCampus);
/* GET <META>. */
//router.get('/:staff/', staff.getStaff);
//router.put('/:staff/', staff.editStaff);
/* Add <META>. */


module.exports = router;
