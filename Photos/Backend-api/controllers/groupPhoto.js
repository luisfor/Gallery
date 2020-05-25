'use strict'

let validator = require('validator');
let GroupPhoto = require('../models/groupPhoto');

let controller = {

    save: function (req, res) {

        let validate_photo, validate_album;

        //collect the parameters
        let params = req.body;
        //console.log(params);

        //validate the data
        try {
            validate_photo = !validator.isEmpty(params.photo);
            validate_album = !validator.isEmpty(params.album);
        } catch (err) {
            //return answer
            res.status(404).send({
                message: 'missing data to send'
            });
        }

        if (validate_album && validate_photo) {

            //create object save
            let groupPhoto = new GroupPhoto();

            //assign values
            groupPhoto.photo = params.photo;
            groupPhoto.album = params.album;
            groupPhoto.user = req.user.sub;
            groupPhoto.state = true;

            //check that the photo is not registered in another album
            let photoById = params.photo;
            GroupPhoto.find({ photo: photoById }).exec((err, groupPhotoId) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error in the request'
                    });
                }

                if (groupPhotoId.length >= 1) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'the photo is assigned in another album'
                    });
                }

                //save data
                groupPhoto.save((err, groupPhotoStore) => {
                    if (err || !groupPhotoStore) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'error saving data'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        groupPhoto: groupPhotoStore
                    });
                });

            });
        } else {
            //return answer
            res.status(400).send({
                message: 'incomplete data'
            });
        }

    },

    deleteGroupPhoto: function (req, res) {

        //get the url id
        let groupPhotoId = req.params.id;

        //search the groupPhoto in the bd to delete it
        GroupPhoto.findOneAndDelete({ _id: groupPhotoId, user: req.user.sub }, (err, groupPhotoRemoved) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error in the request'
                });
            }
            if (!groupPhotoRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'the groupPhoto has not been deleted'
                });
            }
            //return an answer
            return res.status(200).send({
                message: 'success',
                album: groupPhotoRemoved
            });
        });
    },

    getGroupPhotoById: function (req, res) {
        //get the id of the groupPhoto that comes from the url
        let albumId = req.params.id;

        //search by Album id
        GroupPhoto.find({ album: albumId })
            .populate('photo')
            .populate('user')
            .populate('album')
            .exec((err, groupPhoto) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error in the request'
                    });
                }
                if (!groupPhoto) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No groupPhoto to show'
                    });
                }
                //return results
                return res.status(200).send({
                    status: 'success',
                    groupPhoto
                });
            });
    },
    getPhotoByIdGroupAlbum: function (req, res) {
        //get the id of the groupPhoto that comes from the url
        let photoId = req.params.id;

        //search by Album id
        GroupPhoto.find({ photo: photoId })
            .populate('photo')
            .populate('user')
            .populate('album')
            .exec((err, groupPhoto) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error in the request'
                    });
                }
                if (!groupPhoto) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No groupPhoto to show'
                    });
                }
                //return results
                return res.status(200).send({
                    status: 'success',
                    groupPhoto
                });
            });
    }


};

module.exports = controller;