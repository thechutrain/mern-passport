const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../db/models/user");

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    const { id, name } = profile;
    // TODO: swap over to findOrCreate if avail in mongoose
    User.findOne({ "google.googleId": id }, (err, userMatch) => {
      // handle errors here:
      if (err) {
        console.log("Error!! trying to find user with googleId");
        console.log(err);
        return done(null, false);
      }
      // if there is already someone with that googleId
      if (userMatch) {
        return done(null, userMatch);
      } else {
        const newGoogleUser = new User({
          "google.googleId": id,
          firstName: name.givenName,
          lastName: name.familyName,
          username: name.givenName,
        });
        // save this user
        newGoogleUser.save((err, savedUser) => {
          if (err) {
            console.log("Error!! saving the new google user");
            console.log(err);
            return done(null, false);
          } else {
            return done(null, savedUser);
          }
        }); // closes newGoogleUser.save
      }
    }); // closes User.findONe
  }
);

module.exports = strategy;
