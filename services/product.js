const productRepository = require('../repositories/product');

class productService {
  async getProducts() {
    return await productRepository.getAllProducts();
  }
}

module.exports = new productService();
