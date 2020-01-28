const Sequelize = require('sequelize');
const UserModel = require('./Models/User');

const dbUsername = 'admin';
const dbPassword = 'Hw6bzT5rgxTD7nW2rzm4';

const sequelize = new Sequelize(`mysql://${dbUsername}:${dbPassword}@tribehired.cpdcg1qbfzod.ap-southeast-1.rds.amazonaws.com:3306/users`);
sequelize.authenticate()
    .then(() => console.log('connected to mysql.'))
    .catch((error) => console.log('ERR: could not connect to mysql.'));

const User = UserModel(sequelize, Sequelize);

// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => console.log('Database ready to go!'));

module.exports = {
    User
};
