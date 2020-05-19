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
router.get('/photos/:page?', PhotoController.getPhotos);
router.get('/user-photos/:user', PhotoController.getPhotosByUser);
router.get('/photo/:id', PhotoController.getPhoto);
router.put('/photo/:id', md_auth.authenticated, PhotoController.update);
router.delete('/photo/:id', md_auth.authenticated, PhotoController.delete);
router.get('/search/:search', PhotoController.search);


module.exports = router;



