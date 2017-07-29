const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/user')

passport.serializeUser((user, done) => {
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	User.findOne({ _id: id }, 'username', (err, user) => {
		done(null, user)
	})
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

module.exports = passport
