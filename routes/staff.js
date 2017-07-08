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

//router.get('/:staff/', staff.getStaff);
//router.put('/:staff/', staff.editStaff);

module.exports = router;
