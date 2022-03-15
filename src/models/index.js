/**
 * required modules
 */
require('dotenv').config();
/**
 * variables
 */
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
        // ssl: {
        //     rejectUnauthorized: false,
        // }
    },
});

/**
 * define all models
 */
db.admin = require('./adminModel')(db);
db.user = require('./userModel')(db);
db.attribute = require('./attributeModel')(db);
db.productLine = require('./productLineModel')(db);
db.design = require('./designModel')(db);
db.product = require('./productModel')(db);
db.productDetail = require('./productDetailModel')(db)
db.cart = require('./cartModel')(db);
/**
 * database init
 */
db.init = () => {
    db.sync()
    db.admin.init();
    db.attribute.init();
    db.productLine.init();
    db.design.init();
    db.product.init();
};

module.exports = db;
