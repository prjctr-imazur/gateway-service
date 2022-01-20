const passport = require("koa-passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const configService = require("./ConfigService");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configService.jwtSecret,
};

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    return done(null, payload);
  })
);

module.exports = passport;
