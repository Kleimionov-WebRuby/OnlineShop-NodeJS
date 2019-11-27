const ProductRepository = require('../repositories/product');

class ProductService {
  async getProducts() {
    return await ProductRepository.getAll();
  }

  async createProduct(newProduct) {
    return await ProductRepository.create(newProduct);
  }

  async updateProduct(id, updatedProduct) {
    const product = await ProductRepository.get(id);

    if (!product) {
      throw new Error(
        "Sorry, this product is not found. You can't update this product, because it doesn't exists.",
      );
    }

    updatedProduct.updatedAt = new Date();

    await ProductRepository.update(id, updatedProduct);
    return await 'Product successfully updated';
  }

  async deleteProduct(id) {
    const product = await ProductRepository.get(id);

    if (!product) {
      throw new Error(
        "Sorry, this product is not found. You can't delete this product, because it doesn't exists.",
      );
    }

    await ProductRepository.delete(id);
    return await 'Product successfully deleted';
  }
}

module.exports = new ProductService();
