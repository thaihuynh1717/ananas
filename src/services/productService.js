const { Op } = require('sequelize');
const db = require('../models');
const Product = db.product,
    Attribute = db.attribute,
    ProductLine = db.productLine,
    Design = db.design;

const fs = require('fs');
const path = require('path');

function addRelations(include, model, condition) {
    include.push({
        model: model,
        where: {
            slug: condition,
        },
    });
    return include;
}

class ProductService {
    // delete one
    deleteOne(params) {
        let deleteProduct = {
            id: params.id,
            name: params.name,
        };
        console.log(newProduct);
    }
    // add one
    addOne(params) {
        let newProduct = {
            id: params.id,
            name: params.name,
        };
        console.log(newProduct);
    }
    // get all
    async getAll(params) {
        let where = {};
        let include = [];
        let order = [];
        let limit;

        // attribute
        if (params.attribute !== undefined && params.attribute !== '') {
            addRelations(include, Attribute, params.attribute);
        }

        // product line
        if (params.line !== undefined && params.line !== '') {
            addRelations(include, ProductLine, params.line);
        }

        // design
        if (params.design !== undefined && params.design !== '') {
            addRelations(include, Design, params.design);
        }

        // gender
        if (params.gender !== undefined && params.gender !== '') {
            where.gender = params.gender || '';
        }

        if (params.key !== undefined && params.key !== '') {
            where.name = { [Op.substring]: `${params.key}` };
        }

        // sort
        if (params.sort !== undefined && params.sort !== '') {
            order.push(['cost', params.sort]);
        }

        // limit
        if (params.limit !== undefined && params.limit !== '') {
            limit = params.limit;
        }

        let products = await Product.findAll({
            where,
            include,
            order,
            limit,
        });
        if (products) {
            return { success: true, products };
        } else {
            return { success: false, error: 'Not found' };
        }
    }

    // get one
    async getOne(params) {
        let product = await Product.findOne({
            where: {
                id: params.id,
            },
        });
        if (product) {
            const imgFolder = path.join(
                __dirname,
                '../resources/images/products/',
            );

            let images = [];
            fs.readdirSync(imgFolder).forEach((file) => {
                if (file.includes(product.id)) {
                    images.push('/images/products/' + file);
                }
            });
            return { success: true, product, images };
        } else {
            return { success: false, error: 'Not found' };
        }
    }

    async updateOne(params) {}
}

module.exports = new ProductService();
