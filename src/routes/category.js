const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');

const router = express.Router();

const CategoryController = require('../controllers/category');
const categoryController = new CategoryController();

router.use(isAuthorized);

router.get('/', isAdmin, checkRequest(categoryController.getCategories));
router.post('/', isAdmin, checkRequest(categoryController.createCategory));
router.put('/:id', isAdmin, checkRequest(categoryController.updateCategory));
router.delete('/:id', isAdmin, checkRequest(categoryController.deleteCategory));

module.exports = router;
