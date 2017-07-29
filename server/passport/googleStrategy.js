const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../db/models/user')

const strategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback'
	},
	function(token, refreshToken, profile, done) {
		// testing
		console.log('===== GOOGLE PROFILE =======')
		console.log(profile)
		console.log('======== END ===========')
		// code
		const { id, name, email } = profile
		User.findOne({ googleId: id }, (err, userMatch) => {
			// handle errors here:
			if (err) {
				console.log('Error!! trying to find user with googleId')
				console.log(err)
				return done(null, false)
			}
			// if there is already someone with that googleId
			if (userMatch) {
				return done(null, userMatch)
			} else {
				// if no user in our db, create a new user with that googleId
				const newGoogleUser = new User({
					username: email,
					googleId: id
				})
				// save this user
				newGoogleUser.save((err, savedUser) => {
					if (err) {
						console.log('Error!! saving the new google user')
						console.log(err)
						return done(null, false)
					} else {
						return done(null, savedUser)
					}
				}) // closes newGoogleUser.save
			}
		}) // closes User.findOne
	} // closes callback function of new GoogleStratgey
)

module.exports = strategy
