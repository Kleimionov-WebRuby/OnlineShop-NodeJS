const helper = require('../helpers');
const ProductRepository = require('../repositories/product');
const CategoryRepository = require('../repositories/category');
const NotFoundError = require('../classes/errors/not-found-error');

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

class ProductService {
  async getProducts(query) {
    const queryCopy = helper.copyObject(query);

    const { pagination } = helper.carvePaginationFromQuery(queryCopy);
    const { categories } = helper.carveSpecificFieldFromQuery(
      queryCopy,
      'categories',
    );

    return await productRepository.getAll(pagination, queryCopy, categories);
  }

  async createProduct(newProduct) {
    newProduct.createdAt = new Date();
    newProduct.updatedAt = new Date();

    const createdProduct = await productRepository.create(newProduct);

    if (newProduct.categories) {
      const categories = await categoryRepository.getCategoriesByIds(
        newProduct.categories,
      );

      await createdProduct.setCategories(categories);
    }

    return createdProduct;
  }

  async updateProduct(id, updatedProduct) {
    const product = await productRepository.get(id);

    if (!product) {
      throw new NotFoundError(
        "Sorry, this product is not found. You can't update this product, because it doesn't exists.",
      );
    }

    updatedProduct.updatedAt = new Date();

    if (updatedProduct.categories) {
      await product.removeCategories(await product.getCategories());

      const categories = await categoryRepository.getCategoriesByIds(
        updatedProduct.categories,
      );

      await product.setCategories(categories);
    }

    return await productRepository.update(id, updatedProduct);
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
