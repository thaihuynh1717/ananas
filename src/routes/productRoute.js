/**
 * variables
 */
const router = require('express').Router();
const productController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
/**
 * routing
 */
//router.route('/:id').delete(auth, productController.deleteOne)
router.route('/').post(productController.addOne);
// router.route('/:idDetail').put(productController.updateOne);
router.get('/:id', productController.getOne);
router.get('/', productController.getAll);
/**
 *
 */
module.exports = router;
