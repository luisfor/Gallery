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

//routes test
app.get('/test', (req, res) => {
    return res.status(200).send({
        message: "Success"
    });
});

//export module
module.exports = app;