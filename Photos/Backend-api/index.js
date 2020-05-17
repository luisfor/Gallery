'use strict'
let mongoose = require('mongoose');

let app = require('./app');
let port = process.env.PORT || 3000;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/photos', { useNewUrlParser: true})
        .then(() => {
            //console.log('Connection Success');

            //Create server
            app.listen(port, () => {
                //console.log('Server run Success');
                
            })

        })
        .catch(error => console.log(error));