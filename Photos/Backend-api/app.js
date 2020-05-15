'use strict'

//Requires
let express = require('express');
let bodyparser = require('body-parser');

//run express
let app = express();

//load route files

//middlewares
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//cors

//rewrite routes

//export module
module.exports = app;