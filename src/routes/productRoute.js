/**
 * variables
 */
const router = require('express').Router();
const productController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
/**
 * routing
 */
//router.route('/:idDetail').put(auth, productController.updateOne);
router.route('/:id').delete(auth, productController.deleteOne);
router.route('/').post(auth, productController.addOne);
router.get('/:id', productController.getOne);
router.get('/', productController.getAll);
/**
 * export
 */
module.exports = router;
