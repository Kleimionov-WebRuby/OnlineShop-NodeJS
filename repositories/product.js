const Product = require('../models/product');

class productRepository {
  getAll() {
    return Product.findAll();
  }

  get(id) {
    return Product.findByPk(id);
  }

  delete(id) {
    return Product.destroy({
      where: { id },
    });
  }
}

module.exports = new productRepository();
