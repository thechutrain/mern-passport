const TumblrStrategy = require("passport-tumblr").Strategy;
const User = require("../db/models/user");

const strategy = new TumblrStrategy(
  {
    consumerKey: process.env.TUMBLR_CONSUMER_KEY,
    consumerSecret: process.env.TUMBLR_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/tumblr/callback",
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      const { name } = profile._json.response.user;
      // TODO: swap over to findOrCreate if avail in mongoose
      User.findOne({ "tumblr.tumblrId": name }, (err, userMatch) => {
        // handle errors here:
        if (err) {
          return done(null, false);
        }
        // if there is already someone with that tumblrId
        if (userMatch) {
          return done(null, userMatch);
        } else {
          const newTumblrUser = new User({
            "tumblr.tumblrId": name,
            username: name,
          });
          // save this user
          newTumblrUser.save((err, savedUser) =>
            err ? done(null, false) : done(null, savedUser)
          );
        }
      });
    });
  }
);

module.exports = strategy;
