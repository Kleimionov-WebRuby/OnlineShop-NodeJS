const RatingsService = require('../services/ratings.js');
const ratingsService = new RatingsService();

class RatingsController {
  async getProductRating(req, res) {
    const { productId } = req.params;

    const product = await ratingsService.getProductRating(productId);

    res.status(200).send(product);
  }

  async putProductRating(req, res) {
    const { productId } = req.params;
    const { id: userId } = req.user;
    const { ratingValue } = req.body;

    await ratingsService.putProductRating(productId, userId, ratingValue);

    res.status(204).end();
  }

  async removeProductRating(req, res) {
    const { productId } = req.params;
    const { id: userId } = req.user;
    const { ratingValue } = req.body;

    await ratingsService.removeProductRating(productId, userId, ratingValue);

    res.status(204).end();
  }
}

module.exports = RatingsController;
