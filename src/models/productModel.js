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
        gender: {
            type: DataTypes.STRING,
            defaultValue: 'unisex',
        },
    });

    product.belongsTo(db.productLine, { foreignKey: 'productLineId' });
    product.belongsTo(db.design, { foreignKey: 'designId' });
    product.belongsTo(db.attribute, { foreignKey: 'attributeId' });

    product.init = () => {
        try {
            let data = require('./allProducts.json');
            data.forEach(async (item) => {
                let productLine = await db.productLine.findOne({
                    raw: true,
                    where: {
                        slug: item.line,
                    },
                });
                let design = await db.design.findOne({
                    raw: true,
                    where: { slug: item.design },
                });
                let attribute = await db.attribute.findOne({
                    raw: true,
                    where: {
                        slug: item.attribute.toLowerCase().replace(' ', '-'),
                    },
                });
                let quantity = 1000;
                if (attribute.id == 0) {
                    quantity = 100
                }
                if (attribute.id == 6) {
                    quantity = 0
                }
                await db.product.findOrCreate({
                    where: {
                        id: item.id,
                    },
                    defaults: {
                        id: item.id,
                        name: item.name.toLocaleLowerCase(),
                        cost: item.cost,
                        description: item.description,
                        upper: item.upper.toLowerCase().replace(' ', '-'),
                        outsole: item.outsole.toLowerCase().replace(' ', '-'),
                        gender: item.gender,
                        productLineId: productLine.id,
                        attributeId: attribute.id,
                        designId: design.id,
                        quantity: quantity
                    },
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    return product;
};
