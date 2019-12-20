var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    const User = require('../backend/models/user.model');

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { success: false, msg: 'Incorrect username.' });
            }
            if (!user.isPasswordValid(password)) {
                return done(null, false, {success: false,  msg: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });