module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    const gender = db.define('gender', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    gender.init = async () => {
        let genders = ['male', 'female', 'unisex'];
        genders.forEach(async (e) => {
            let [newGender, created] = await gender.findOrCreate({
                where: {
                    name: e,
                },
                defaults: {
                    name: e,
                },
            });
        });
    };

    return gender;
};
