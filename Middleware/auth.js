const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).send('Missing auth token.');

    try {
        const decoded = jwt.verify(token, config.get('jwtSecretKey'));
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid token.');
    }
};