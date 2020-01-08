const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');
const validate = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

const router = express.Router();

const CategoryController = require('../controllers/category');
const categoryController = new CategoryController();

router.use(isAuthorized);

router.get('/', isAdmin, checkRequest(categoryController.getCategories));
router.post(
  '/',
  isAdmin,
  validate({ body: validationSchemas.category }),
  checkRequest(categoryController.createCategory),
);
router.put(
  '/:id',
  isAdmin,
  validate({ params: validationSchemas.id, body: validationSchemas.category }),
  checkRequest(categoryController.updateCategory),
);
router.delete(
  '/:id',
  isAdmin,
  validate({ params: validationSchemas.id }),
  checkRequest(categoryController.deleteCategory),
);

module.exports = router;
