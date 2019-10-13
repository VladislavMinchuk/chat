const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Load User model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      console.log(username);
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log('no user');
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.checkPassword(password)) {
          console.log('inncorrect');
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    console.log('serialize: ' + user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserialize: ' + user);
      done(err, user);
    });
  });
};
