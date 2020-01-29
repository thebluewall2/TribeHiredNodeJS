const bcrypt = require('bcrypt');

const config = require('config');
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const auth = require('../Middleware/auth');
const { User } = require('../sequelize');

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]+$')),
    });

    return schema.validate(user);
}

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        const errorMessage = error.details[0].message;

        return res.status(400).send(errorMessage);
    }

    const { name, password, email } = req.body;

    User.findOne({
        where: { email }
    }).then(async (user) => {
        if (user) {
            return res.status(400).send('User already exists.');
        } else {
            const hashedPassword = await bcrypt.hash(password, config.get('saltRounds'));

            user = User.create({
                name,
                password: hashedPassword,
                email
            });

            return res.status(200).send('User created!');
        }
    })
});

router.get('/', auth, async (req, res) => {
    const attributes = ['id', 'name', 'email'];

    User.findAll({ attributes }).then(users => {
        return res.json(users);
    });
});

module.exports = router;
