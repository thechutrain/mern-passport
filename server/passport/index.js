const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/user')
// BOTH VERSIONS WORK!
const GoogleStratgey = require('./googleStrategy')
// const GoogleStratgey = require('./googleStrategyV2')

passport.serializeUser((user, done) => {
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	User.findOne(
		{ _id: id },
		'username firstName lastName photos',
		(err, user) => {
			console.log('======= DESERILAIZE USER CALLED ======')
			console.log(user)
			done(null, user)
		}
	)
})

// ==== Register Local Strategy ====
passport.use(
	new LocalStrategy(
		{
			usernameField: 'username' // not necessary, DEFAULT
		},
		function(username, password, done) {
			User.findOne({ username: username }, (err, userMatch) => {
				if (err) {
					return done(err)
				}
				if (!userMatch) {
					return done(null, false, { message: 'Incorrect username' })
				}
				if (!userMatch.checkPassword(password)) {
					return done(null, false, { message: 'Incorrect password' })
				}
				return done(null, userMatch)
			})
		}
	)
)

passport.use(GoogleStratgey)

module.exports = passport
