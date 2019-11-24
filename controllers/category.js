const categoryService = require('../services/category');

class categoryController {
  async getCategories(req, res) {
    const categories = await categoryService.getCategories();

    res.status(200).send(categories);
  }
}

module.exports = new categoryController();
