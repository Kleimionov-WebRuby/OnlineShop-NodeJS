const ProductService = require('../services/product');
const responseFormat = require('../middlewares/response-format');

const productService = new ProductService();

class ProductController {
  async getProducts(req, res) {
    const products = await productService.getProducts();

    res.status(200).send(products);
  }

  async createProduct(req, res) {
    const result = await productService.createProduct(req.body);

    res.status(200).send(result);
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await productService.updateProduct(id, req.body);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(id);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
