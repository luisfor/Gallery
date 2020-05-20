'use strict'

//import moongoose
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//loading the mongo paging module
let mongoosePaginate = require('mongoose-paginate-v2');

//models
let GroupPhotoSchema = Schema({
    photo: { type: Schema.ObjectId, ref: 'Photo' },
    album: { type: Schema.ObjectId, ref: 'Album' },
    user: { type: Schema.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    state: { type: Boolean, require: true }
});

//load paging
GroupPhotoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('GroupPhoto', GroupPhotoSchema);