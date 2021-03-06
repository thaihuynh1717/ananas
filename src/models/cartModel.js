module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    const cart = db.define('cart', {
        quantity: {
            type: DataTypes.INTEGER,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isNew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    });
    /**
     * belongsTo
     */
    cart.belongsTo(db.user, { foreignKey: 'userId' });
    cart.belongsTo(db.product, { foreignKey: 'productId' });
    /**
     * return
     */
    return cart;
};
