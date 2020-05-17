'use strict'

let controller = {

    save: function (req, res) {
        res.status(200).send({
            message: 'test photos save'
        });
    }

};

module.exports = controller;