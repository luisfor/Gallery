'use strict'
let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'gallery-password-token-key';



exports.authenticated = function (req, res, next) {

    //check that we get the authorization
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'the request does not have the authorization header'
        });
    }

    //clear the token and remove quotes
    let token = req.headers.authorization.replace(/['"]+/g, '');

    //decode the token
    let payload;
    try {
        payload = jwt.decode(token, secret);

        //check if the token has expired
        if (payload.exp <= moment().unix()) {
            return res.status(404).send({
                message: 'the token has expired'
            });
        }


    } catch (err) {
        return res.status(404).send({
            message: 'the token is not valid'
        });
    }

    //attach identified user to request
    req.user = payload;

    //take action
    next();
}