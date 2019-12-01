const session = require('express-session');
const passport = require('../passport');

module.exports = expressApp => {
  expressApp.use(
    session({
      secret: '2cShop5',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
    }),
  );
  expressApp.use(passport.initialize());
  expressApp.use(passport.session());
};
