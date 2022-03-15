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
                    slug: e.toString().toLowerCase().replaceAll(' ', '-'),
                    title: e,
                },
            });
        });
    };

    return productLine;
};
