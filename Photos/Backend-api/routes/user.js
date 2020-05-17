'user strict'

let express = require('express');
let UserController = require('../controllers/user');

//load Object routes

let router = express.Router();

//user path
router.post('/register', UserController.save);
router.post('/login', UserController.login);

module.exports = router;