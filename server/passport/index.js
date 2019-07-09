const passport = require("passport");
// const LocalStrategy = require("./localStrategy");
const GoogleStrategy = require("./googleStrategy");
const User = require("../db/models/user");

passport.serializeUser((user, done) => {
  done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
  User.findOne(
    { _id: id },
    "firstName lastName local.username",
    (err, user) => {
      done(null, user);
    }
  );
});

// ==== Register Strategies ====
// passport.use(LocalStrategy);
passport.use(GoogleStrategy);

module.exports = passport;
