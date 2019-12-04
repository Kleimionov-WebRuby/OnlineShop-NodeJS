const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');

const router = express.Router();

const ProductController = require('../controllers/product');
const productController = new ProductController();

router.use(isAuthorized);

router.get('/', productController.getProducts);
router.post('/', isAdmin, productController.createProduct);
router.put('/:id', isAdmin, productController.updateProduct);
router.delete('/:id', isAdmin, productController.deleteProduct);

module.exports = router;
