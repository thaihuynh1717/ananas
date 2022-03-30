module.exports = (db) => {
    const { DataTypes } = require('sequelize');

    // shoes("ID", name, 'categoryID', description, details, cost, gender)
    const product = db.define('product', {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        upper: {
            type: DataTypes.STRING,
        },
        outsole: {
            type: DataTypes.STRING,
            defaultValue: 'rubber',
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    product.belongsTo(db.productLine, { foreignKey: 'productLineId' });
    product.belongsTo(db.design, { foreignKey: 'designId' });
    product.belongsTo(db.attribute, { foreignKey: 'attributeId' });
    product.belongsTo(db.gender, { foreignKey: 'genderId' });

    product.addOne = async (item) => {
        let attributes = ['id'];
        /**
         * get product line
         */
        let productLine = await db.productLine.findOne({
            raw: true,
            where: {
                slug: item.line,
            },
        });
        /**
         * get design
         */
        let design = await db.design.findOne({
            raw: true,
            where: {
                slug: item.design,
            },
            attributes,
        });
        /**
         * get attribute
         */
        let attribute = await db.attribute.findOne({
            raw: true,
            where: {
                slug: item.attribute.toLowerCase().replace(' ', '-'),
            },
            attributes,
        });
        let gender = await db.gender.findOne({
            raw: true,
            where: {
                name: item.gender,
            },
            attributes,
        });
        /**
         * create product
         */
        let [newProduct, created] = await db.product.findOrCreate({
            where: {
                id: item.id,
            },
            defaults: {
                id: item.id,
                name: item.name.toLocaleLowerCase(),
                cost: item.cost,
                description: item.description,
                gender: gender.id,
                productLineId: productLine.id,
                attributeId: attribute.id,
                designId: design.id,
            },
        });
        return [newProduct, created];
    };

    product.init = () => {
        let products = require('./allProducts.json');
        products.forEach(async (item) => {
            let [newProduct, created] = await product.addOne(item);
            if (created) {
                let quantity = 100;
                if (newProduct.attributeId == 0) {
                    quantity = 10;
                }
                if (newProduct.attributeId == 6) {
                    quantity = 0;
                }
                for (let size = 35; size <= 46; size++) {
                    let newStock = await db.stock.findOrCreate({
                        where: {
                            productId: newProduct.id,
                        },
                        defaults: {
                            id: newProduct.id + '_' + size,
                            size,
                            quantity,
                        },
                    });
                }
            }
        });
    };
    // return product model
    return product;
};
