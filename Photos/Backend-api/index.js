'use strict'
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/photos', { useNewUrlParser: true})
        .then(() => {
            console.log('Connection Success');
        })
        .catch(error => console.log(error));