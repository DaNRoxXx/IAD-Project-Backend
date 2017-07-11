var express = require('express');
var router = express.Router();
var model = require('../models');
var user = require('./controllers/user');

router.post('/', user.addUser);
router.post('/get', user.getUser);
router.get('/getall', user.getAllUsers);
router.put('/edit', user.editUser);

module.exports = router;
