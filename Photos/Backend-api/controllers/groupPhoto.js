'use strict'

let validator = require('validator');
let GroupPhoto = require('../models/groupPhoto');

let controller = {

    save: function (req, res) {
        //return answer
        res.status(200).send({
            message: 'save'
        });
    },

    deleteGroupPhoto: function (req, res) {
        //return answer
        res.status(200).send({
            message: 'delete'
        });
    },

    searchGroupPhoto: function (req, res) {
        //return answer
        res.status(200).send({
            message: 'search'
        });
    }


};

module.exports = controller;