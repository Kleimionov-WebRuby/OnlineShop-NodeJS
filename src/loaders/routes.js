const authRouter = require('../routes/auth');
const productRouter = require('../routes/product');
const categoryRouter = require('../routes/category');
const roleRouter = require('../routes/role');
const userRouter = require('../routes/user');
const ratingRouter = require('../routes/ratings');
const requestRouter = require('../routes/request');

module.exports = expressApp => {
  expressApp
    .use(authRouter)
    .use('/users', userRouter)
    .use('/products', productRouter)
    .use('/category', categoryRouter)
    .use('/role', roleRouter)
    .use('/ratings', ratingRouter)
    .use('/requests', requestRouter);
};
