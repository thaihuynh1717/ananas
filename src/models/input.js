const defaults = require('pg/lib/defaults');

module.exports = async (db) => {
    await db
        .sync()
        .then(() => {
            console.log('Database has been sync...');
        })
        .catch((err) => {
            console.log('DATABASE ERROR:', err);
        });
    // create attribute model
    let attributes = [
        'Limited Edition',
        'Online Only',
        'Sale off',
        'Best Seller',
        'New Arrival',
        'Sold Out',
        'Stocking',
    ];
    attributes.forEach((e) => {
        db.attribute
            .findOrCreate({
                where: {
                    id: attributes.indexOf(e),
                },
                defaults: {
                    slug: e.toLowerCase().replaceAll(' ', '-'),
                    title: e,
                },
            })
            .then((att, created) => {
                //console.log(`${created}`);
            })
            .catch((err) => {
                console.log(`!!! ERROR : ${err}`);
            });
    });
    // create design model
    let designs = ['Low Top', 'High Top', 'Slip-on', 'Mule'];
    designs.forEach((e) => {
        db.design
            .findOrCreate({
                where: {
                    id: designs.indexOf(e),
                },
                defaults: {
                    slug: e.toLowerCase().replaceAll(' ', '-'),
                    title: e,
                },
            })
            .then((e, created) => {
                //console.log(`${created}`);
            })
            .catch((err) => {
                console.log(`!!! ERROR : ${err}`);
            });
    });

    // productLine input data
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
    productLines.forEach((e) => {
        db.productLine
            .findOrCreate({
                where: {
                    id: productLines.indexOf(e),
                },
                defaults: {
                    slug: e.toString().toLowerCase().replaceAll(' ', '-'),
                    title: e,
                },
            })
            .then((att, created) => {
                //console.log(`${created}`);
            })
            .catch((err) => {
                console.log(`!!! ERROR : ${err}`);
            });
    });

    let data = require('./inputData.json');
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
            where: { slug: item.attribute.toLowerCase().replace(' ', '-') },
        });
        await db.product.findOrCreate({
            where: {
                id: item.id,
            },
            defaults: {
                id: item.id,
                name: item.name,
                cost: item.cost,
                description: item.description,
                upper: item.upper.toLowerCase().replace(' ', '-'),
                outsole: item.outsole.toLowerCase().replace(' ', '-'),
                gender: item.gender,
                productLineId: productLine.id,
                attributeId: attribute.id,
                designId: design.id,
            },
        });
        await db.productImages.findOrCreate({
            where: {
                productId: item.id,
                img: item.img,
            },
            defaults: {
                productId: item.id,
                img: item.img,
            },
        });
    });

    let products = await db.product.findAll({
        raw: true,
    });
    products.forEach(async (item) => {
        let quantity = 1000;
        // limited-edition
        if (item.attributeId == 0) quantity = 10;
        // sold-out
        if (item.attributeId == 5) quantity = 0;

        for (let size = 35; size <= 46; size++) {
            await db.productDetail.findOrCreate({
                where: {
                    id: `${item.id}_${size}`,
                },
                defaults: {
                    id: `${item.id}_${size}`,
                    productId: item.id,
                    size,
                    quantity,
                },
            });
        }
    });
};
