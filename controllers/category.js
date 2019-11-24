const categoryService = require('../services/category');

class categoryController {
  async getCategories(req, res) {
    const categories = await categoryService.getCategories();

    res.status(200).send(categories);
  }

  async createCategory(req, res) {
    const newCategory = req.body;
    const category = await categoryService.createCategory(newCategory);

    res.status(200).send(category);
  }
}

module.exports = new categoryController();
