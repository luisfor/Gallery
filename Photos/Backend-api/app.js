'use strict'

//Requires
let express = require('express');
let bodyparser = require('body-parser');

//run express
let app = express();

//load route files
let user_routes = require('./routes/user');
let photo_routes = require('./routes/photo');
let album_routes = require('./routes/album');
let groupPhoto_routes =require('./routes/groupPhoto');

//middlewares
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//cors
// Header and cors configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rewrite routes
app.use('/api', user_routes);
app.use('/api', photo_routes);
app.use('/api', album_routes);
app.use('/api', groupPhoto_routes);


//export module
module.exports = app;