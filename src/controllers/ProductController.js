const db = require('../models');
const fs = require('fs')
const path = require('path')

function addCondition(include, model, condition) {
    include.push({
        model: model,
        where: {
            slug: condition ,
        },
    });
    return include;
}

class ProductController {
    // [GET] /api/product-list
    async getAll(req, res) {
        let where = {};
        let include = [];
        let order = []
        let limit;

        // attribute
        if (req.query.attribute !== undefined && req.query.attribute !== '') {
            addCondition(include, db.attribute, req.query.attribute)
        }

        // product line
        if (req.query.line !== undefined && req.query.line !== '') {
            addCondition(include, db.productLine, req.query.line)
        }


        // design 
        if (req.query.design !== undefined && req.query.design !== '') {
            addCondition(include, db.design, req.query.design)
        }

        // gender
        if (req.query.gender !== undefined && req.query.gender !== '') {
            where.gender = req.query.gender;
        }

        // sort
        if (req.query.sort !== undefined && req.query.sort !== '') {
            order.push(['cost', req.query.sort]);
        }

        // limit
        if (req.query.limit !== undefined && req.query.limit !== '') {
            limit = req.query.limit
        }

        let product_list = await db.product.findAll({ where, include, order, limit });

        // response
        res.json(product_list);
    }

    // [GET] /api/product-detail/:slug
    async getOne(req, res) {
        let product = await db.product.findOne({
            where: {
                id: req.params.slug,
            },
        });

        const imgFolder = path.join(__dirname, '../resources/images/products/');

        let imageProduct = [];
        fs.readdirSync(imgFolder).forEach(file => {
            if (file.includes(product.id)) {
                imageProduct.push(file);
            }
        });

        // send response
        res.json({
            product,
            imageProduct
        });
    }
}

module.exports = new ProductController();
