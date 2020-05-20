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

    getAlbums: function (req, res) {
        //pick up current page
        let page;
        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == "0") {
            page = 1
        } else {
            page = parseInt(req.params.page);
        }

        //indicate paging options
        let options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 5,
            page: page
        };

        //search paged
        Album.paginate({}, options, (err, album) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error when querying'
                });
            }
            if (!album) {
                return res.status(404).send({
                    status: 'error',
                    message: 'there are no album'
                });
            }

            //return results(album, total albums, total pages)
            return res.status(200).send({
                status: 'success',
                album: album.docs,
                toltalDocs: album.totalDocs,
                totalPages: album.totalPages
            });
        });

    },

  



};

module.exports = controller;