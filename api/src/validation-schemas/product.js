const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .label('Title')
    .required()
    .messages({
      'string.base': `Invalid type. Title must be a string`,
      'string.empty': `Please enter product title`,
      'string.min': `Title should have a minimum length of {#limit}`,
      'any.required': `Title is a required field`,
    }),
  desc: Joi.string()
    .min(5)
    .max(1000)
    .label('Description')
    .required()
    .messages({
      'string.base': `Invalid type. Description must be a string`,
      'string.empty': `Please enter product description`,
      'string.min': `Description should have a minimum length of {#limit}`,
      'string.max': `Description should have a maximum length of {#limit}`,
      'any.required': `Description is a required field`,
    }),
  picture: Joi.string()
    .label('Picture')
    .required(),
  price: Joi.number()
    .label('Price')
    .positive()
    .allow(0)
    .required()
    .messages({
      'number.base': `Invalid type. Description must be a number`,
      'number.empty': `Please enter product price`,
      'number.positive': `Invalid price, the price must be a positive number`,
    }),
  amount: Joi.number()
    .label('Amount')
    .required()
    .positive()
    .allow(0)
    .messages({
      'number.base': `Invalid type. Amount must be a number`,
      'number.empty': `Please enter product amount`,
      'number.positive': `Invalid amount, the amount must be a positive number`,
    }),
  categories: Joi.optional(),
});
