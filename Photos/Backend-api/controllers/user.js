'user strinct'

let validator = require('validator');
let bcrypt = require('bcrypt-nodejs');
let User = require('../models/user');
let jwt = require('../services/jwt');

let controller = {
    save: function (req, res) {

        let validate_name, validate_surname, validate_email, validate_password;

        //collect request parameters
        let params = req.body;

        //validate data
        try {
            validate_name = !validator.isEmpty(params.name);
            validate_surname = !validator.isEmpty(params.surname);
            validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(400).send({
                message: 'incomplete data'
            });
        }
        if (validate_name && validate_surname && validate_email && validate_password) {
            //create user object
            let user = new User();

            //assign values ​​to the user
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email;
            user.image = null;
            user.role = 'Role_USER';
            user.state = true;

            //check if the user exists
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: 'error when testing email duplication'
                    });
                }
                if (!issetUser) {
                    //if it doesn't exist

                    //encrypt password
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        //save user
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: 'error saving data'
                                });
                            }
                            if (!userStored) {
                                return res.status(400).send({
                                    message: 'user could not be saved'
                                });
                            }
                            //return answer
                            return res.status(200).send({
                                status: 'success',
                                user: userStored
                            });
                        });//close save
                    });//close bcrypt

                } else {
                    return res.status(500).send({
                        message: 'this email is registered'
                    });
                }
            });

        } else {
            return res.status(400).send({
                message: 'incorrect validation, please try again'
            });
        }

    },
    login: function (req, res) {
        //declaration of variables
        let validate_email, validate_password;

        //collect the request parameters
        let params = req.body;

        //validate data
        try {
            validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(400).send({
                message: 'incomplete data'
            });
        }
        if (!validate_email || !validate_password) {
            return res.status(401).send({
                message: 'incorrect data'
            });
        }

        //search registered user with email
        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

            if (err) {
                return res.status(500).send({
                    message: 'error identifying'
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: 'Username does not exist'
                });
            }

            //if you find it
            //check the password that matches the email and password
            bcrypt.compare(params.password, user.password, (err, check) => {

                //Yeah that's right
                if (check) {

                    //generate jwt token and return it
                    if (params.gettoken) {
                        //return the data
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        //clear object password
                        user.password = undefined;

                        //return the data
                        return res.status(200).send({
                            message: 'success',
                            user
                        });
                    }

                } else {
                    return res.status(404).send({
                        message: 'credentials are not correct'
                    });
                }
            });
        });
    },

    update: function (req, res) {

        //collect the request parameters
        let params = req.body;

        //validate data
        try {
            let validate_name = !validator.isEmpty(params.name);
            let validate_surname = !validator.isEmpty(params.surname);
            let validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        } catch (error) {
            return res.status(400).send({
                message: 'incomplete data',
                params
            });
        }
        //remove necessary properties
        delete params.password;

        //variable with the user id
        let userId = req.user.sub;

        //check if the email is unique
        if (req.user.email != params.email) {
            User.findOne({ email: params.email.toLowerCase() }, (err, user) => {
                if (err) {
                    return res.status(500).send({
                        message: 'error updating'
                    });
                }
                if (user && user.email == params.email) {
                    return res.status(200).send({
                        message: 'the email is registered to another user'
                    });
                }
                if (validate_email && validate_name && validate_surname) {

                    User.findOneAndUpdate({ _id: userId }, params, { new: true }, (err, userUpdated) => {
                        if (err) {
                            return res.status(500).send({
                                status: 'error',
                                message: 'error when updating user'
                            });
                        }

                        if (!userUpdated) {
                            return res.status(500).send({
                                status: 'error',
                                message: 'not updated'
                            });
                        }
                        //devolver respuesta
                        return res.status(200).send({
                            status: 'success',
                            user: userUpdated
                        });
                    });
                } else {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar usuario'
                    });
                }
            });
        } else {

            //search and update documents
            User.findOneAndUpdate({ _id: userId }, params, { new: true }, (err, userUpdated) => {

                if (err) {
                    //return the data
                    return res.status(500).send({
                        status: 'error',
                        message: 'error updating user'
                    });
                }

                if (!userUpdated) {
                    //return the data
                    return res.status(500).send({
                        status: 'error',
                        message: 'no user has been updated'
                    });
                }

                //return the data
                return res.status(200).send({
                    status: 'success',
                    user: userUpdated
                });
            });
        }

    }
};
module.exports = controller;