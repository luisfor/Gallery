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

    getPhoto: function(req, res) {
        
    }

};

module.exports = controller;