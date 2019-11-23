const productRoute = require('../routes/product');

module.exports = expressApp => {
  expressApp.use('/products', productRoute);
};
