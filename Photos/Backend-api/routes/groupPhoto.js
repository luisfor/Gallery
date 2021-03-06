'use strict'

let express = require('express');

let GroupPhotoController = require('../controllers/groupPhoto');

//load Object routes
let router = express.Router();
let md_auth = require('../middlewares/authenticated');


//photo path
router.post('/groupPhoto', md_auth.authenticated, GroupPhotoController.save);
router.delete('/groupPhoto/:id', md_auth.authenticated, GroupPhotoController.deleteGroupPhoto);
router.get('/groupPhoto/:id', GroupPhotoController.getGroupPhotoById);
router.get('/PhotoByIdGroupAlbum/:id', GroupPhotoController.getPhotoByIdGroupAlbum);


module.exports = router;