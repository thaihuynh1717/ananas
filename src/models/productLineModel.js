module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    // productLine("id",'categoryId', slug, title)
    const productLine = db.define('productLine', {
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isNew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    });
    /**
     * product initalize
     */
    productLine.init = () => {
        let productLines = [
            'Basas',
            'Vintas',
            'Urbas',
            'Pattas',
            'Creas',
            'Graphic Tee',
            'Hoodie',
            'Sweatshirt',
            'Backpack',
            'Socks',
            'Hat',
            'Track 6',
            'Basic Tee',
            'Shoelaces',
        ];
        productLines.forEach(async (e) => {
            let [newProductLine, created] = await db.productLine.findOrCreate({
                where: {
                    id: productLines.indexOf(e),
                },
                defaults: {
                    slug: e.toLowerCase().replaceAll(' ', '-'),
                    name: e.toLowerCase(),
                },
            });
        });
    };

    return productLine;
};
