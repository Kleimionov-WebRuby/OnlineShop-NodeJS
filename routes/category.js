const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const router = express.Router();

const CategoryController = require('../controllers/category');
const categoryController = new CategoryController();

router.use(isAuthorized);

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
