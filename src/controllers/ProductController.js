/**
 * variables
 */
const productService = require('../services').productService;
/**
 * class productController
 */
class ProductController {
    // [DELETE] /api/product/:id
    deleteOne(req, res) {
        productService.deleteOne(req.params).then((result) => {
            res.send(result);
        });
    }
    // [POST] /api/products/
    addOne(req, res) {
        productService.addOne(req.body).then((result) => {
            res.send(result);
        });
    }
    // [GET] /api/products
    getAll(req, res) {
        productService.getAll(req.query).then((result) => {
            res.send(result);
        });
    }
    // [GET] /api/products/:id
    getOne(req, res) {
        productService.getOne(req.params).then((result) => {
            res.send(result);
        })
    }
}
/**
 * export
 */
module.exports = new ProductController();
