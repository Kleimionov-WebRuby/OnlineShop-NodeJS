const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const checkRequest = require('../middlewares/check-request');
const router = express.Router();
const validate = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

const RatingsController = require('../controllers/ratings');
const ratingsController = new RatingsController();

router.use(isAuthorized);

router.get(
  '/:productId',
  validate({ params: validationSchemas.ratingId }),
  checkRequest(ratingsController.getProductRating),
);
router.post(
  '/:productId',
  validate({
    params: validationSchemas.ratingId,
  }),
  checkRequest(ratingsController.putProductRating),
);

router.delete(
  '/:productId',
  validate({
    params: validationSchemas.ratingId,
  }),
  checkRequest(ratingsController.removeProductRating),
);

module.exports = router;
