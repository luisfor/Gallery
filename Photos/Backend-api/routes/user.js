'user strict'

let express = require('express');
let UserController = require('../controllers/user');

//load Object routes

let router = express.Router();
let md_auth = require('../middlewares/authenticated');

//configure the multiparty module
let multiparty = require('connect-multiparty');
let md_upload = multiparty({ uploadDir: './uploads/users'});

//user path
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated, UserController.update);
router.post('/upload-avatar', [md_auth.authenticated, md_upload], UserController.uploadAvatar);
router.get('/avatar/:fileName', UserController.avatar);

module.exports = router;