'use strict'

let validator = require('validator');
let Album = require('../models/album');

let controller = {

    save: function (req, res) {

        let validate_name;

        //collect the parameters
        let params = req.body;

        //validate the data
        try {
            validate_name = !validator.isEmpty(params.name);
        } catch (err) {
            //return answer
            res.status(404).send({
                message: 'missing data to send'
            });
        }
        if (validate_name) {

            //create object save
            let album = new Album();

            //assign values
            album.name = params.name;
            album.state = true;
            album.user = req.user.sub;

            //save album
            album.save((err, albumStore) => {
                if (err || !albumStore) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'error saving data'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    album: albumStore
                });
            });
        } else {
            //return answer
            res.status(400).send({
                message: 'incomplete data'
            });
        }
    },

    update: function (req, res) {
        //collect the request parameters
        let params = req.body;

        let validate_name;

        //validate data
        try {
            validate_name = !validator.isEmpty(params.name);
        } catch (error) {
            return res.status(400).send({
                message: 'incomplete data',
                params
            });
        }

        //variable with the album id
        let albumId = req.params.id;

        if (validate_name) {
            //search and update documents
            Album.findOneAndUpdate({ _id: albumId }, params, { new: true }, (err, albumUpdated) => {

                if (err) {
                    //return the data
                    return res.status(500).send({
                        status: 'error',
                        message: 'error updating album'
                    });
                }

                if (!albumUpdated) {
                    //return the data
                    return res.status(500).send({
                        status: 'error',
                        message: 'no album has been updated'
                    });
                }

                //return the data
                return res.status(200).send({
                    status: 'success',
                    album: albumUpdated
                });
            });
        }


    },


};

module.exports = controller;