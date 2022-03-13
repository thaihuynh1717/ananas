module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    const design = db.define('design', {
        slug: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
    });

    return design;
};
