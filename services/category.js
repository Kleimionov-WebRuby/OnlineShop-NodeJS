const categoryRepository = require('../repositories/category');

class categoryService {
  async getCategories() {
    return await categoryRepository.getAll();
  }
}

module.exports = new categoryService();
