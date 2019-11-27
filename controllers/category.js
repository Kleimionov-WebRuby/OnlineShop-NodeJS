const CategoryService = require('../services/category');
const responseFormat = require('../middlewares/response-format');

class CategoryController {
  async getCategories(req, res) {
    const categories = await CategoryService.getCategories();

    res.status(200).send(categories);
  }

  async createCategory(req, res) {
    const category = await CategoryService.createCategory(req.body);

    res.status(200).send(category);
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const result = await CategoryService.updateCategory(id, req.body);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      res.status(400).send(responseFormat(err.message));
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const result = await CategoryService.deleteCategory(id);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      res.status(400).send(responseFormat(err.message));
    }

    res.status(200).send(updatedCategory);
  }
}

module.exports = new CategoryController();
