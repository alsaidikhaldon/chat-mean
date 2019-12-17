
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../backend/models/user.model');

module.exports = passport => {

    let  opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECERT;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    User.findById( jwt_payload.use._id , function(err, user)  {
        if (err) {
           
            return done(err, false);
            res.render(" *****///////////*****  " + err);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
           
        }
    });
    
    
}));


}



//User.findById(payload.id)
//  .then(user => {
//      if(user){
//        return done(null, {
//            id: user.id,
//            firstname: user.firstName,
//            email: user.email,
//        });
//      }
//      return done(null, false);
//   }).catch(err => console.error(err));