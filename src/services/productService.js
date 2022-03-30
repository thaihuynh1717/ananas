/**
 * variables
 */
const { Op } = require('sequelize');
const db = require('../models');
const fs = require('fs');
const path = require('path');
const Product = db.product,
    Attribute = db.attribute,
    ProductLine = db.productLine,
    Design = db.design;
/**
 * add relation function
 */
function addRelations(include, model, condition) {
    include.push({
        model: model,
        where: {
            slug: condition,
        },
    });
    return include;
}
/**
 * product service class
 */
class ProductService {
    // update one
    async updateOne(params) {}

    // delete one
    deleteOne(params) {
        let deleteProduct = {
            id: params.id,
            name: params.name,
        };
        if (deleteProduct) {
            return { success: true, deleteProduct };
        } else {
            return { success: false, error: 'delete product failed' };
        }
    }
    // add one
    async addOne(params) {
        let [newProduct, created] = await Product.addOne({ params });
        if (created) {
            return { success: true, newProduct };
        } else {
            return { success: false, error: 'add product failed' };
        }
    }
    // get all
    async getAll(params) {
        // variables
        let where, include, order, limit;
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
        // key
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
        // find all
        let products = await Product.findAll({
            where,
            attributes: [
                //'id', 'name', 'cost', 'description', 'upper', 'outsole', 'gender',
            ],
            include,
            order,
            limit,
        });
        //
        if (products) {
            return { success: true, products };
        } else {
            return { success: false, error: 'not found' };
        }
    }
    // get one
    async getOne(params) {
        //
        let product = await Product.findOne({
            where: {
                id: params.id,
            },
        });
        //
        if (product) {
            const imgFolder = path.join(
                __dirname,
                '../resources/images/products/',
            );
            //
            let images = [];
            fs.readdirSync(imgFolder).forEach((file) => {
                if (file.includes(product.id)) {
                    images.push('/images/products/' + file);
                }
            });
            return { success: true, product, images };
        } else {
            return { success: false, error: 'product not found' };
        }
    }
}

module.exports = new ProductService();
