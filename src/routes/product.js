const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');
const router = express.Router();

const ProductController = require('../controllers/product');
const productController = new ProductController();

router.use(isAuthorized);

router.get('/', checkRequest(productController.getProducts));
router.post('/', isAdmin, checkRequest(productController.createProduct));
router.put('/:id', isAdmin, checkRequest(productController.updateProduct));
router.delete('/:id', isAdmin, checkRequest(productController.deleteProduct));

module.exports = router;
