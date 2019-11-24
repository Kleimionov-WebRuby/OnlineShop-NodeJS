const categoryRepository = require('../repositories/category');

class categoryService {
  async getCategories() {
    return await categoryRepository.getAll();
  }

  async createCategory(category) {
    return await categoryRepository.create(category);
  }
}

module.exports = new categoryService();
