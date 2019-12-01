const errorHandler = require('../middlewares/error-handler');

module.exports = expressApp => {
  expressApp.use(errorHandler);
};
