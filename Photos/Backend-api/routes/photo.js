'use strict'

let express = require('express');

let PhotoController = require('../controllers/photo');

//load Object routes
let router = express.Router();
let md_auth = require('../middlewares/authenticated');

//configure the multiparty module
let multiparty = require('connect-multiparty');
let md_upload = multiparty({ uploadDir: './uploads/photos'});

//photo path
router.post('/upload-photo', md_auth.authenticated, md_upload, PhotoController.save);
router.get('/photos/:page?', PhotoController.getPhoto);


module.exports = router;



