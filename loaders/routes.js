const authRouter = require('../routes/auth');
const productRouter = require('../routes/product');
const categoryRouter = require('../routes/category');

module.exports = expressApp => {
  expressApp.use(authRouter);
  expressApp.use('/products', productRouter);
  expressApp.use('/category', categoryRouter);
};
