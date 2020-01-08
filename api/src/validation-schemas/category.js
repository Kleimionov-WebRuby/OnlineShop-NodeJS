const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  categoryName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': `Invalid type. Category name must be a string`,
      'string.empty': `Please enter category name`,
      'string.min': `Category name should have a minimum length of {#limit}`,
      'string.max': `Category name should have a maximum length of {#limit}`,
    }),
});
