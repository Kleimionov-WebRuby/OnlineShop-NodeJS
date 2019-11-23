const Product = require('../models/product');

class productRepository {
  getAll() {
    return Product.findAll();
  }

  get(id) {
    return Product.findByPk(id);
  }

  create(product) {
    return Product.create(product);
  }

  delete(id) {
    return Product.destroy({
      where: { id },
    });
  }
}

module.exports = new productRepository();
