module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    // inventory("productId","size", quantity)
    const productDetail = db.define('productDetail', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        size: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    });

    productDetail.belongsTo(db.product);

    return productDetail;
};
