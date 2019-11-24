const Category = require('../models/category');

class categoryRepository {
  getAll() {
    return Category.findAll();
  }
}

module.exports = new categoryRepository();
