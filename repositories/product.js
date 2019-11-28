const Product = require('../models/product');
const Category = require('../models/category');

class ProductRepository {
  getAll() {
    return Product.findAll({
      attributes: ['id', 'title', 'desc', 'price', 'picture', 'amount'],
      include: [
        {
          model: Category,
          attributes: ['id', 'categoryName'],
        },
      ],
    });
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
