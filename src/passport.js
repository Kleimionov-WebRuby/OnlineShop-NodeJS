const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthenticationError = require('./classes/errors/auth-error');
const UserRepository = require('./repositories/user');

const userRepository = new UserRepository();

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await userRepository.getUser({ email });

      if (!user) {
        return done(
          new AuthenticationError('Email or password is incorrect!', 401),
        );
      } else {
        const isValid = await user.validPassword(password);

        if (!isValid) {
          return done(
            new AuthenticationError('Email or password is incorrect!', 401),
          );
        }
      }
      return done(null, user);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userRepository.getUser({ id });

  done(null, user);
});

module.exports = passport;
