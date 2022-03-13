module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    const cart = db.define('cart', {
        quantity: {
            type: DataTypes.INTEGER,
        },
        total: {
            type: DataTypes.INTEGER,
        },
    });
    cart.belongsTo(db.user);
    return cart;
};
