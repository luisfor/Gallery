'use strict'

//import moongoose
let mongoose = require('mongoose');
let Schema = mongoose.Schema;



let PhotoSchema = Schema({
    name: String,
    image: String,
    state: String,
    user: {type: Schema.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Photo', PhotoSchema);