'use strict'

let express = require('express');

let AlbumController = require('../controllers/album');

//load Object routes
let router = express.Router();
let md_auth = require('../middlewares/authenticated');


//photo path
router.post('/album', md_auth.authenticated, AlbumController.save);
router.get('/albums/:page?', AlbumController.getAlbums);
router.get('/user-album/:user', AlbumController.getAlbumsByUser);
router.get('/album/:id', AlbumController.getAlbumsById);
router.put('/album/:id', md_auth.authenticated, AlbumController.update);
router.delete('/album/:id', md_auth.authenticated, AlbumController.deleteAlbum);
router.get('/album-search/:search', AlbumController.searchAlbums);


module.exports = router;