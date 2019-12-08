const ProductService = require('../services/product');
const productService = new ProductService();

class ProductController {
  async getProducts(req, res) {
    const options = req.query;
    const products = await productService.getProducts(options);

    res.status(200).send(products);
  }

  async createProduct(req, res) {
    const result = await productService.createProduct(req.body);

    res.status(200).send(result);
  }

  async updateProduct(req, res) {
    const { id } = req.params;

    await productService.updateProduct(id, req.body);

    res.status(204).end();
  }

  async deleteProduct(req, res) {
    const { id } = req.params;

    await productService.deleteProduct(id);

    res.status(204).end();
  }
}

module.exports = ProductController;
