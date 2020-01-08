const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  roleName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': `Invalid type. Role name must be a string`,
      'string.empty': `Please enter role name`,
      'string.min': `Role name should have a minimum length of {#limit}`,
      'string.max': `Role name should have a maximum length of {#limit}`,
    }),
});
