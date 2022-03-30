require('dotenv').config();
const bcrypt = require('bcrypt');

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
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isNew: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
    });
    /**
     * init
     */
    user.init = async () => {
        let passwordHashed = bcrypt.hashSync('password', 10);
        let [user001, created] = await user.findOrCreate({
            where: {
                email: 'hvthai@domain',
                phone: '0335990263',
            },
            defaults: {
                name: 'Huỳnh Văn Thái',
                email: 'hvthai@domain',
                phone: '0335990263',
                password: passwordHashed,
            },
        });
    };
    /**
     * return
     */
    return user;
};
