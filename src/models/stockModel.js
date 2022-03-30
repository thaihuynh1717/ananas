module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    // inventory("productId","size", quantity)
    const stock = db.define('stock', {
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
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isNew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    /**
     * belongsTo
     */
    stock.belongsTo(db.product, { foreignKey: 'productId' });
    /**
     * return
     */
    return stock;
};
