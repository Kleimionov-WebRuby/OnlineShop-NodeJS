const Product = require('../models/product');

class productRepository {
  getAllProducts() {
    return Product.findAll();
  }
}

module.exports = new productRepository();
