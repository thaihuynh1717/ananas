module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    const design = db.define('design', {
        name: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING,
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

    design.init = () => {
        let designs = ['Low Top', 'High Top', 'Slip-on', 'Mule'];
        designs.forEach(async (e) => {
            let [newDesign, created] = await db.design.findOrCreate({
                where: {
                    id: designs.indexOf(e),
                },
                defaults: {
                    name: e.toLowerCase(),
                    slug: e.toLowerCase().replaceAll(' ', '-'),
                },
            });
        });
    };

    return design;
};
