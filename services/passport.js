const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require ('../config');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  // verify user and password
  User.findOne({ email: email}, function(err, user){
    if (err) {
      return done(err);
    }
    if (!user){
      return done(null, false);
    }
    user.comparePassword(password, function(err, isMatch){
      if (err) {
        return done(err);
      }
      if(!isMatch){
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

// setup strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User.findById(payload.sub, function(err, user){
    if (err) {
      return done(err, false);
    }
    if (user){
      done(null, user);
    } else {
      donde(null, fasle);
    }
  });
});

// tell passport to use the strategy
passport.use(jwtLogin);
passport.use(localLogin);
