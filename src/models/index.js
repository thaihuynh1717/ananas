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
db.role=require('./roleModel')(db);
db.employee = require('./employeeModel')(db);
db.user = require('./userModel')(db);
db.attribute = require('./attributeModel')(db);
db.productLine = require('./productLineModel')(db);
db.design = require('./designModel')(db);
db.gender=require('./genderModel')(db);
db.product = require('./productModel')(db);
db.stock = require('./stockModel')(db);
db.cart = require('./cartModel')(db);
/**
 * database init
 */
db.init = () => {
    db.sync().then(() => {
        db.role.init()
        db.employee.init();
        db.user.init()
        db.attribute.init();
        db.productLine.init();
        db.design.init();
        db.gender.init()
        db.product.init();
    });
};

module.exports = db;
