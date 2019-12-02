const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const router = express.Router();

const ProductController = require('../controllers/product');
const productController = new ProductController();

router.use(isAuthorized);

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
