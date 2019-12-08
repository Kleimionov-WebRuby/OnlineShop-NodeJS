const helper = require('../helpers');
const ProductRepository = require('../repositories/product');
const NotFoundError = require('../classes/errors/not-found-error');

const productRepository = new ProductRepository();

class ProductService {
  async getProducts(query) {
    const { pagination, options } = helper.getPaginationFromQuery(query);

    return await productRepository.getAll(pagination, options);
  }

  async createProduct(newProduct) {
    newProduct.createdAt = new Date();
    newProduct.updatedAt = new Date();

    return await productRepository.create(newProduct);
  }

  async updateProduct(id, updatedProduct) {
    const product = await productRepository.get(id);

    if (!product) {
      throw new NotFoundError(
        "Sorry, this product is not found. You can't update this product, because it doesn't exists.",
      );
    }

    updatedProduct.updatedAt = new Date();

    await productRepository.update(id, updatedProduct);

    return null;
  }

  async deleteProduct(id) {
    const product = await productRepository.get(id);

    if (!product) {
      throw new NotFoundError(
        "Sorry, this product is not found. You can't delete this product, because it doesn't exists.",
      );
    }

    await productRepository.delete(id);

    return null;
  }
}

module.exports = ProductService;
