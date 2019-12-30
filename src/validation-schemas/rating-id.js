const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  productId: Joi.number()
    .min(1)
    .required()
    .messages({
      'number.min': `Product "id" must be larger than or equal to 1`,
    }),
});
