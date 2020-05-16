'user strinct'

let validator = require('validator');
let bcrypt = require('bcrypt-nodejs');
let User = require('../models/user');

let controller = {
    save: function (req, res) {

        //collect request parameters
        let params = req.body;

        //validate data
        let validate_name = !validator.isEmpty(params.name);
        let validate_surname = !validator.isEmpty(params.surname);
        let validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        let validate_password = !validator.isEmpty(params.password);

        if (validate_name && validate_surname && validate_email && validate_password) {
            //create user object
            let user = new User();

            //assign values ​​to the user
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email;
            user.image = null;

            //check if the user exists
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: "error when testing email duplication"
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
                                    message: "error saving data"
                                });
                            }
                            if (!userStored) {
                                return res.status(400).send({
                                    message: "user could not be saved"
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
                        message: "this email is registered"
                    });
                }
            });

        } else {
            return res.status(400).send({
                message: "incorrect validation, please try again"
            });
        }

    }
};
module.exports = controller;