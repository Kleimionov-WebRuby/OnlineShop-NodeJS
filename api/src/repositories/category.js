const Category = require('../models/category');
const { Op } = require('sequelize');

class CategoryRepository {
  getAll() {
    return Category.findAll();
  }
  getCategoriesByIds(categoriesIds) {
    return Category.findAll({
      where: {
        id: { [Op.in]: categoriesIds },
      },
    });
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

module.exports = CategoryRepository;
