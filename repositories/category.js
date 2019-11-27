const Category = require('../models/category');

class CategoryRepository {
  getAll() {
    return Category.findAll();
  }
  get(id) {
    return Category.findByPk(id);
  }
  create(category) {
    return Category.create(category);
  }

  update(id, category) {
    return Category.update(category, {
      where: { id },
    });
  }

  delete(id) {
    return Category.destroy({ where: { id } });
  }
}

module.exports = new CategoryRepository();
