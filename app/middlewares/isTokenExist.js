const config = require('../../resources/config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.body.token || req.params.token || req.query.token || req.get('x-access-token');

    if(token){
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if(err)
                res.status(403).send({success: false, message: "Failed to authenticate user"});
            req.decoded = decoded;
            next();
        });
    } else {
        res.redirect(403, '/login');
    }
};
