var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../app/models/user');
var config = require('../config/main');

module.exports = function(passport) {
  var opts = {};
  // set to passport an JwtStrategy to authenticate
  // and pass function resolution to get the user
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id:jwt_payload.id}, function(err, user) {
      if(err) {
        return done(err, false);
      }
      if(user) {
        done(null,user);
      }else{
        done(null,false);
      }
    });
  }));
};
