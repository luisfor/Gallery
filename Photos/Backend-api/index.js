'use strict'
let mongoose = require('mongoose');

let app = require('./app');

//install locale variables
require('dotenv').config({ path: 'variable.env' });

//local variables and port
let host = process.env.HOST || '0.0.0.0';
let port = process.env.PORT || 3000;


mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connection Success');

        //Create server
        app.listen(port, host, () => {
            console.log('Server run Success');

        })

    })
    .catch(error => console.log(error));