const authRouter = require('../routes/auth');
const productRouter = require('../routes/product');
const categoryRouter = require('../routes/category');
const roleRouter = require('../routes/role');
const userRouter = require('../routes/user');
const requestRouter = require('../routes/request');
const resetPasswordRouter = require('../routes/reset-password');

module.exports = expressApp => {
  expressApp
    .use(authRouter)
    .use('/users', userRouter)
    .use('/products', productRouter)
    .use('/category', categoryRouter)
    .use('/role', roleRouter)
    .use('/requests', requestRouter)
    .use('/reset_password', resetPasswordRouter);
};
