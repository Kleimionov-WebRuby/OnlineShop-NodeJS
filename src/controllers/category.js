const CategoryService = require('../services/category');
const responseFormat = require('../middlewares/response-format');

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

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const result = await categoryService.updateCategory(id, req.body);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      next(err);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const result = await categoryService.deleteCategory(id);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
