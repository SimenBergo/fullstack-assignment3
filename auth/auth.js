const passport      = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel     = require('../schema/schema');

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: 'Wrong Password!' });
          }
  
          return done(null, user, { message: 'Login successful!' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

//Verify the JWT
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'supersecret',
      roles: ['Student', 'Teacher'],
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports.requireAdmin;
