const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');
const router = express.Router();
const validate = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

const ProductController = require('../controllers/product');
const productController = new ProductController();

router.use(isAuthorized);

router.get('/', checkRequest(productController.getProducts));
router.post(
  '/',
  isAdmin,
  validate({ body: validationSchemas.product }),
  checkRequest(productController.createProduct),
);
router.put(
  '/:id',
  isAdmin,
  validate({ params: validationSchemas.id, body: validationSchemas.product }),
  checkRequest(productController.updateProduct),
);
router.delete(
  '/:id',
  isAdmin,
  validate({ params: validationSchemas.id }),
  checkRequest(productController.deleteProduct),
);

module.exports = router;
