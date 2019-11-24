const Category = require('../models/category');

class categoryRepository {
  getAll() {
    return Category.findAll();
  }
  create(category) {
    return Category.create(category);
  }
}

module.exports = new categoryRepository();
