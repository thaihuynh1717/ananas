module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    // attribute("id", title)
    const attribute = db.define('attribute', {
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    attribute.init = () => {
        let attributes = [
            'Limited Edition',
            'Online Only',
            'Sale off',
            'Best Seller',
            'New Arrival',
            'Sold Out',
            'Stocking',
        ];
        attributes.forEach(async (e) => {
            let newAttribute = await db.attribute.findOrCreate({
                where: {
                    id: attributes.indexOf(e),
                },
                defaults: {
                    slug: e.toLowerCase().replaceAll(' ', '-'),
                    title: e,
                },
            });
        });
    };

    return attribute;
};
