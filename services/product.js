const productRepository = require('../repositories/product');

class productService {
  async getProducts() {
    return await productRepository.getAll();
  }

  async createProduct(newProduct) {
    return await productRepository.create(newProduct);
  }

  async updateProduct(id, updatedProduct) {
    const product = await productRepository.get(id);

    if (!product) {
      throw new Error(
        "Sorry, this product is not found. You can't update this product, because it doesn't exists.",
      );
    }

    updatedProduct.updatedAt = new Date();

    await productRepository.update(id, updatedProduct);
    return await 'Product successfully updated';
  }

  async deleteProduct(id) {
    const product = await productRepository.get(id);

    if (!product) {
      throw new Error(
        "Sorry, this product is not found. You can't delete this product, because it doesn't exists.",
      );
    }

    await productRepository.delete(id);
    return await 'Product successfully deleted';
  }
}

module.exports = new productService();
