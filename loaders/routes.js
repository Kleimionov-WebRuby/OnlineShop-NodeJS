const productRouter = require('../routes/product');
const categoryRouter = require('../routes/category');

module.exports = expressApp => {
  expressApp.use('/products', productRouter);
  expressApp.use('/category', categoryRouter);
};
