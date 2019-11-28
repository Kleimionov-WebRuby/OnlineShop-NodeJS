const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product');

const productController = new ProductController();

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
