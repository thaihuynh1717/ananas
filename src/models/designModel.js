module.exports = (db) => {
    const { DataTypes } = require('sequelize');
    const design = db.define('design', {
        slug: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
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
                    slug: e.toLowerCase().replaceAll(' ', '-'),
                    title: e,
                },
            });
        });
    };

    return design;
};
