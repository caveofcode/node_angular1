const mongoose = require('mongoose');
const config = require('../../resources/config');

const mongoDBConnection = () => {
    mongoose.connect(config.databasePath, err => {
        if(err)
            console.log(err);
        console.log('DB connection');
    })
};

module.exports = mongoDBConnection;
