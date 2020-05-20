'use strict'

//import moongoose
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//loading the mongo paging module
let mongoosePaginate = require('mongoose-paginate-v2');

//models
let AlbumSchema = Schema({
    name: { type: String, require: true },
    user: { type: Schema.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    state: { type: Boolean, require: true }
});

//load paging
AlbumSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Album', AlbumSchema);