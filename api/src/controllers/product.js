const ProductService = require('../services/product');
const productService = new ProductService();

class ProductController {
  async getProducts(req, res) {
    const options = req.query;
    const products = await productService.getProducts(options);
    // This code was used for rewrite the key count, cause when we get 'products' object from Repositories
    // we get key count as an array, but I want to get just number
    products.count = products.count.length;

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
