module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    // attribute("id", title)
    const attribute = db.define('attribute', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
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
                    name: e.toLowerCase(),
                    slug: e.toLowerCase().replaceAll(' ', '-'),
                },
            });
        });
    };

    return attribute;
};
