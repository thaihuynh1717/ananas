/**
 * variables
 */
const bcrypt = require('bcrypt');
/**
 *
 */
module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    const admin = db.define('admin', {
        name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    admin.init = async () => {
        let passwordHashed = bcrypt.hashSync('admin1001', 10);
        let admin1001 = await db.admin.findOrCreate({
            where: {
                id: 1001,
            },
            defaults: {
                id: 1001,
                name: 'huynh van thai',
                phone: '0335990263',
                password: passwordHashed,
            },
        });
    };
    return admin;
};
