const ProductsRepository = require('../repositories/product');
const UserRepository = require('../repositories/user');
const NotFoundError = require('../classes/errors/not-found-error');
const { Sequelize } = require('sequelize');

const productsRepository = new ProductsRepository();
const userRepository = new UserRepository();

class RatingsService {
  async getProductRating(productId) {
    const product = await productsRepository.get(productId);
    if (!product) {
      throw new NotFoundError('Sorry, this product does not exists!');
    }
    const ratings = await product.getRatings({
      subQuery: true,
      distinct: true,
      attributes: [
        [
          Sequelize.fn('AVG', Sequelize.col('ratings.rating_value')),
          'rating_value',
        ],
        [
          Sequelize.fn(
            'count',
            Sequelize.fn('DISTINCT', Sequelize.col('ratings.id')), // Without this option I get wrong count in response. In count includes the included rows as categories
          ),
          'rating_total',
        ],
      ],
    });
    return ratings;
  }

  async putProductRating(productId, userId, ratingValue) {
    const user = await userRepository.getUser({ id: userId });
    const product = await productsRepository.get(productId);

    if (!product) {
      throw new NotFoundError('Sorry, this product does not exists!');
    }

    await user.addProduct(product, { through: { ratingValue } });
  }

  async removeProductRating(productId, userId, ratingValue) {
    const user = await userRepository.getUser({ id: userId });
    const product = await productsRepository.get(productId);

    if (!product) {
      throw new NotFoundError('Sorry, this product does not exists!');
    }

    await user.removeProduct(product, { through: { ratingValue } });
  }
}

module.exports = RatingsService;
