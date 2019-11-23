const productRepository = require('../repositories/product');

class productService {
  async getProducts() {
    return await productRepository.getAll();
  }

  async deleteProduct(id) {
    const product = await productRepository.get(id);

    if (!product) {
      throw new Error(
        "Sorry, this product is not found. You can't delete this product, because it doesn't exists",
      );
    }

    await productRepository.delete(id);
    return await 'Product successfully deleted';
  }
}

module.exports = new productService();
