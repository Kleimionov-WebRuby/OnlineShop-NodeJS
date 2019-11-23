const productService = require('../services/product');

class productController {
  async getProducts(req, res) {
    res.send(await productService.getProducts());
  }
}

module.exports = new productController();
