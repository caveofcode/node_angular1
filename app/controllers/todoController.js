const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/users', (req, res) => {

    User.find({}, (err, users) => {
        if(err){
            res.send(err);
            return;
        };
        res.json(users);
    })
});

module.exports = router;
