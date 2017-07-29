const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../db/models/user')

const stratgey = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback'
	},
	function(token, refreshToken, profile, done) {
		// code
	}
)
