'use strict'

let express = require('express');

let AlbumController = require('../controllers/album');

//load Object routes
let router = express.Router();
let md_auth = require('../middlewares/authenticated');


//photo path
router.post('/album', md_auth.authenticated, AlbumController.save);



module.exports = router;