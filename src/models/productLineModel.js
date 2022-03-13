module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    // productLine("id",'categoryId', slug, title)
    const productLine = db.define('productLine', {
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return productLine;
};
