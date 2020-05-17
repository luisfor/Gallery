'user strict'

let express = require('express');
let UserController = require('../controllers/user');

//load Object routes

let router = express.Router();
let md_auth = require('../middlewares/authenticated');

//user path
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated, UserController.update);

module.exports = router;