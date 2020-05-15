'user strinct'

let validator = require('validator');

let controller = {
    save: function (req, res) {

        //collect request parameters
        let params = req.body;

        //validate data
        let validate_name = !validator.isEmpty(params.name);
        let validate_surname = !validator.isEmpty(params.surname);
        let validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        let validate_password = !validator.isEmpty(params.password);

        //create user object

        //assign values ​​to the user

        //check if the user exists

        //if it doesn't exist

        //encrypt password

        //save user

        //return answer
        return res.status(200).send({
            message: "User register"
        });
    }
};
module.exports = controller;