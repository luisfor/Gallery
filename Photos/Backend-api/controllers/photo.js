'use strict'

let validator = require('validator');
let Photo = require('../models/photo');

//internal nodejs library to work with the file system
let fs = require('fs');

//nodejs library to work folder paths
let path = require('path');

let controller = {

    save: function (req, res) {

        let validate_name;

        //collect the parameters
        let params = req.body;

        //collect the request file
        let file_name = 'avatar not uploaded';

        if (!req.files) {
            //return the data
            return res.status(404).send({
                status: 'error',
                user: file_name
            });

        }

        //get the name and the file extension to upload
        //full file path
        let file_path = req.files.imgPhoto.path;

        //separate each part of the routes with the split method of javascript in windows
        let file_split = file_path.split('\\');

        //separate each part of the routes with the split method of javascript on mac or linux
        //let file_split = file_path.split('/');

        //get the file name
        file_name = file_split[2];

        //file extension
        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];

        //check image only extension and if it is not valid delete the uploaded file
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif' && file_ext != 'ico' && file_ext != 'PNG' && file_ext != 'JPG' && file_ext != 'JPEG' && file_ext != 'GIF' && file_ext != 'ICO') {
            fs.unlink(file_path, (err) => {
                return res.status(500).send({
                    status: 'error',
                    message: 'the file extension is not valid'
                });
            });
        } else {

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
                let photo = new Photo();

                //assign values
                photo.name = params.name;
                photo.image = file_name;
                photo.state = true;
                photo.user = req.user.sub;

                //save photo
                photo.save((err, photoStore) => {
                    if (err || !photoStore) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'error saving data'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        photo: photoStore
                    });
                });
            } else {
                //return answer
                res.status(400).send({
                    message: 'incomplete data'
                });
            }

        }


    },

    getPhotos: function (req, res) {

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
        Photo.paginate({}, options, (err, photo) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error when querying'
                });
            }
            if (!photo) {
                return res.status(404).send({
                    status: 'error',
                    message: 'there are no pictures'
                });
            }

            //return results(photos, total photos, total pages)
            return res.status(200).send({
                status: 'success',
                photo: photo.docs,
                toltalDocs: photo.totalDocs,
                totalPages: photo.totalPages
            });
        });

    },

    getPhotosByUser: function (req, res) {

        //get the user id from the url
        let userId = req.params.user;

        //search the photos of the user by id
        Photo.find({
            user: userId
        })
            .sort([['date', 'descending']])
            .exec((err, photo) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error in the request'
                    });
                }
                if (!photo) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No photos to show'
                    });
                }
                //return results
                return res.status(200).send({
                    status: 'success',
                    photo
                });
            });

    },

    getPhoto: function (req, res) {

        //get the id of the photo that comes from the url
        let photoId = req.params.id;

        //search by photo id
        Photo.findById(photoId)
            .populate('user')
            .exec((err, photo) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error in the request'
                    });
                }
                if (!photo) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No photos to show'
                    });
                }
                //return results
                return res.status(200).send({
                    status: 'success',
                    photo
                });
            });
    },

    update: function (req, res) {

        let validate_name;

        //collect the id of the current photo
        let photoId = req.params.id;

        //collect the data that comes from the post
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


        //make a json with the modified data

        let update = {
            name: params.name
        };

        //search and update the photo by id and by user id

        //return results
        return res.status(200).send({
            status: 'success'
        });
    },

    delete: function (req, res) {

        //get the url id
        let photoId = req.params.id;

        //search the photo in the bd to delete it
        Photo.findOneAndDelete({ _id: photoId, user: req.user.sub }, (err, photoRemoved) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error in the request'
                });
            }
            if (!photoRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'the photo has not been deleted'
                });
            }
            if (photoRemoved) {
                let fileName = photoRemoved.image;
                let pathFile = './uploads/photos/' + fileName;
                fs.unlinkSync(pathFile);
            }
            //return an answer
            return res.status(200).send({
                message: 'success',
                photo: photoRemoved
            });
        });
    },

    search: function (req, res) {

        //get the string sent by the url
        let searchString = req.params.search;
        let fecha = Date.parse(searchString);

        if (!isNaN(fecha) && typeof (fecha) == 'number') {
            //search the database by date 
            Photo.find({"date": {$gte: new Date(fecha)}})
                .exec((err, photo) => {
                    if (err) {

                        return res.status(500).send({
                            status: 'error',
                            message: 'error in the request'
                        });
                    }
                    if (!photo) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'There are no photos that match the search'
                        });
                    }
                    //return an answer
                    return res.status(200).send({
                        message: 'success',
                        photo
                    });
                });

        }

        if (isNaN(fecha)) {
            //search the database by string 
            Photo.find({
                "$or":[
                    {"name": {"$regex": searchString, "$options": "i"}}
                ]
            })
                .exec((err, photo) => {
                    if (err) {

                        return res.status(500).send({
                            status: 'error',
                            message: 'error in the request'
                        });
                    }
                    if (!photo) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'There are no photos that match the search'
                        });
                    }
                    //return an answer
                    return res.status(200).send({
                        message: 'success',
                        photo
                    });
                });
        }
    }

};

module.exports = controller;