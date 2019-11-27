const ProductService = require('../services/product');
const responseFormat = require('../middlewares/response-format');

class ProductController {
  async getProducts(req, res) {
    const products = await ProductService.getProducts();

    res.status(200).send(products);
  }

  async createProduct(req, res) {
    try {
      const result = await ProductService.createProduct(req.body);

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(responseFormat(err.message));
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.updateProduct(id, req.body);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      res.status(400).send(responseFormat(err.message));
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      res.status(400).send(responseFormat(err.message));
    }
  }
}

module.exports = new ProductController();
