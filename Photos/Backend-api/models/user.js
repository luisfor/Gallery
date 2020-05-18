'use strict'

//import moongoose
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String,
    state: String,
    date: { type: Date, default: Date.now }
});

UserSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = mongoose.model('User', UserSchema);