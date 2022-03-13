const { finalizeSession } = require('pg/lib/sasl');

module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    const user = db.define('user', {
        name: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
    return user;
};
