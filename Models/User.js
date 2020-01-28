module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            required: true,
        },
        email: {
            type: type.STRING,
            allowNull: false,
            required: true,
        },
        password: {
            type: type.STRING,
            allowNull: false,
            required: true,
        }
    });
};
