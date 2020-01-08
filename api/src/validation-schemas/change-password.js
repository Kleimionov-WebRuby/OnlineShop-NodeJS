const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  oldPassword: Joi.string()
    .label('Password')
    .required()
    .min(6)
    .max(20)
    .messages({
      'string.base': 'Old password should be a string',
      'string.empty': `Please enter your old password`,
      'string.min': `Old password should have a minimum length of {#limit}`,
      'string.max': `Old password should have a maximum length of {#limit}`,
      'any.required': `Old password is a required field`,
    }),
  newPassword: Joi.string()
    .label('Password')
    .required()
    .min(6)
    .max(20)
    .messages({
      'string.base': 'New password should be a string',
      'string.empty': `Please enter your new password`,
      'string.min': `New password should have a minimum length of {#limit}`,
      'string.max': `New password should have a maximum length of {#limit}`,
      'any.required': `New password is a required field`,
    }),
  confirmNewPassword: Joi.string()
    .label('Password')
    .required()
    .min(6)
    .max(20)
    .valid(Joi.ref('newPassword'))
    .messages({ 'any.only': 'Passwords do not match' }),
});
