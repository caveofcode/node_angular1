const User = require('../models/user');
const config = require('../../resources/config');
const express = require('express');
const createToken = require('../helpers/createToken');
const isTokenExist = require('../middlewares/isTokenExist');

const router = express.Router();

module.exports = (app) => {

    router.post('/signup', (req, res) => {
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        user.save(err => {
            if(err){
                res.send(err);
                return;
            }
            res.json({message: "User has been created"});
        });
    });

    router.post('/login', (req, res) => {

        User.findOne({
            username: req.body.username
        }).select('password').exec((err, user) => {

            if(err)
                console.log(err);
            if(!user){
                res.send("User dosn't exist");
            } else if(user){
                let userValidPassword = user.comparePassword(req.body.password);
                if(!userValidPassword){
                    res.send("Passport of the user dosn't valid");
                } else {
                    const token = createToken(user);
                    res.json({
                        success: true,
                        message: "Successed login",
                        token: token
                    });
                }
            }
        });
    });

    router.get('/user', isTokenExist, (req, res) => {
        res.json(req.decoded);
    })

    return router;
};
