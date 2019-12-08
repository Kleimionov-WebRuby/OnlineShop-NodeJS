const Product = require('../models/product');
const Category = require('../models/category');
const { Op } = require('sequelize');

class ProductRepository {
  getAll(options) {
    const { title, page, size } = options;
    const skip = Number(size) * (Number(page) - 1);
    const limit = Number(size);
    const sequelizeOptions = {
      where: {
        title: {
          [Op.like]: title ? `%${title}%` : '%%',
        },
      },
      attributes: ['id', 'title', 'desc', 'price', 'picture', 'amount'],
      include: [
        {
          model: Category,
          attributes: ['id', 'categoryName'],
          through: { attributes: [] },
        },
      ],
      limit,
      offset: skip,
      distinct: true, // Without this option I get wrong count in response. In count includes the included rows as categories
    };

    return Product.findAndCountAll(sequelizeOptions);
  }

  get(id) {
    return Product.findByPk(id);
  }

  create(product) {
    return Product.create(product);
  }

  update(id, product) {
    return Product.update(product, {
      where: { id },
    });
  }

  delete(id) {
    return Product.destroy({
      where: { id },
    });
  }
}

module.exports = ProductRepository;
