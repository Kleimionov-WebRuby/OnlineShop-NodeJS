const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');

const router = express.Router();

const CategoryController = require('../controllers/category');
const categoryController = new CategoryController();

router.use(isAuthorized);

router.get('/', isAdmin, categoryController.getCategories);
router.post('/', isAdmin, categoryController.createCategory);
router.put('/:id', isAdmin, categoryController.updateCategory);
router.delete('/:id', isAdmin, categoryController.deleteCategory);

module.exports = router;
