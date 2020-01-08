const UnprocessableEntityError = require('../classes/errors/unprocessable-entity-error');

const validate = (schema, validateData) => {
  if (schema) {
    const { error } = schema.validate(validateData);

    if (error) {
      throw new UnprocessableEntityError(`${error.details[0].message}!`);
    }
  }
};

module.exports = validateObject => (req, res, next) => {
  validate(validateObject.body, req.body);
  validate(validateObject.params, req.params);
  validate(validateObject.query, req.query);

  next();
};
