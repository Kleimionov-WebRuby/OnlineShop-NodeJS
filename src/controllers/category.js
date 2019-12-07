const CategoryService = require('../services/category');

const categoryService = new CategoryService();

class CategoryController {
  async getCategories(req, res) {
    const categories = await categoryService.getCategories();

    res.status(200).send(categories);
  }

  async createCategory(req, res) {
    const category = await categoryService.createCategory(req.body);

    res.status(200).send(category);
  }

  async updateCategory(req, res) {
    const { id } = req.params;

    await categoryService.updateCategory(id, req.body);

    res.status(204).end();
  }

  async deleteCategory(req, res) {
    const { id } = req.params;

    await categoryService.deleteCategory(id);

    res.status(204).end();
  }
}

module.exports = CategoryController;
