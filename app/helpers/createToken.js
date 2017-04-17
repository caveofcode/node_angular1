const config = require('../../resources/config');
const jwt = require('jsonwebtoken');

const secretKey = config.secretKey;

module.exports = (user) => {
    const token = jwt
    .sign(
        {
            id: user.id,
            name: user.name,
            username: user.username
        },
        secretKey,
        {expiresIn: 10000});
    return token;
}
