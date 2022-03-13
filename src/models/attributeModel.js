module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    // attribute("id", title)
    const attribute = db.define('attribute', {
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return attribute;
};
