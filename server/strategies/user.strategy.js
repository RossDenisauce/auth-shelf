const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person').Person;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Person.findById(id).then((result) => {
    // Handle Errors
    const user = result;

    if (!user) {
      // user not found
      done(null, false, { message: 'Incorrect credentials.' });
    } else {
      // user found
      done(null, user);
    }
  }).catch((err) => {
    console.log('query err ', err);
    done(err);
  });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({ //Where the router /login post goes, Does all the work of logging in
  passReqToCallback: true,
  usernameField: 'username',
}, ((req, username, password, done) => {
    Person.find({ username })
      .then((result) => {
        const user = result && result[0];
        if (user && encryptLib.comparePassword(password, user.password)) { // Goes to encryption.js and checks the current password with the database password
          // all good! Passwords match!
          done(null, user);             // Goes to steralizeUser()
        } else if (user) {
          // not good! Passwords don't match!
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          // not good! No user with that name
          done(null, false);
        }
      }).catch((err) => {
        console.log('error', err);
        done(null, {});
      });
  })));

module.exports = passport;
