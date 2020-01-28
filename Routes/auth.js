const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const { User } = require('../sequelize');

function generateAuthToken(user) {
    const { id } = user;

    return jwt.sign({ id }, config.get('jwtSecretKey'));
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('No email or password.');
    }

    User.findOne({
        where: { email }
    }).then(async (user) => {
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        const { dataValues } = user;
        const valid = await bcrypt.compare(password, dataValues.password);

        if (valid) {
            const token = generateAuthToken(dataValues);

            res.status(200).send(token);
        } else {
            return res.status(400).send('Invalid email or password.');
        }
    });
});

module.exports = router;
