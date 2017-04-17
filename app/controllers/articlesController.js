const express = require('express');
const UserArticle = require('../models/userArticle');
const isTokenExist = require('../middlewares/isTokenExist');

const router = express.Router();

router.route('/')
    .post(isTokenExist, (req, res) => {
        const userArticle = new UserArticle({
            author: req.decoded.id,
            content: req.body.content
        });

        userArticle.save(err => {
            console.log(req.decoded.id);
            console.log(req.body.content);
            if(err){
                res.send(err);
                return;
            }
            res.json({message: "New article created"})
        });
    })
    .get(isTokenExist, (req, res) => {
        UserArticle.find({author: req.decoded.id}, (err, articles) => {
            if(err){
                res.send(err);
                return;
            }
            res.json(articles);
        })
    })

    module.exports = router;
