'use strict'

//import moongoose
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//loading the mongo paging module
var mongoosePaginate = require('mongoose-paginate-v2');

let PhotoSchema = Schema({
    name: String,
    image: String,
    state: String,
    user: {type: Schema.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now }
});

//load paging
PhotoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Photo', PhotoSchema);