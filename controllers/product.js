const productService = require('../services/product');
const responseFormat = require('../middlewares/response-format');

class productController {
  async getProducts(req, res) {
    const products = await productService.getProducts();

    res.status(200).send(products);
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(id);

      res.status(200).send(responseFormat(result));
    } catch (err) {
      res.status(400).send(responseFormat(err.message));
    }
  }
}

module.exports = new productController();
