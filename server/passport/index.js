const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/user')

passport.serializeUser((user, done) => {
	// console.log('===== serializeUser called!!! ====')
	// console.log(`User from serialize User: ${user}`)
	// console.log('------ end --------')
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	// console.log('=== deserializeUser called!!! ===')
	// console.log(id)
	User.findOne({ _id: id }, 'email', (err, user) => {
		// console.log(`Found user in deserializeUser: ${JSON.stringify(user)}`)
		// console.log('------ end --------')
		done(null, user)
	})
})

// ==== Register Local Strategy ====

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		function(username, password, done) {
			// console.log('verify function called')
			// Check the database for the user
			User.findOne({ email: username }, (err, userMatch) => {
				if (err) {
					return done(err)
				}
				if (!userMatch) {
					return done(null, false, { message: 'Incorrect username' })
				}
				if (!userMatch.checkPassword(password)) {
					return done(null, false, { message: 'Incorrect password' })
				}
				// const hack = JSON.parse(JSON.stringify(userMatch))
				// return done(null, hack)
				return done(null, userMatch)
			})
		}
	)
)

module.exports = passport
// const serializeUser = function() {
// 	return passport.serializeUser((user, done) => {
// 		console.log(`User from serialize User: ${user}`)
// 		done(null, user._id)
// 	})
// }
//
// const deserializeUser = function() {
// 	return passport.deserializeUser((id, done) => {
// 		User.findOne({ _id: id }).exec(userMatch => {
// 			console.log(`Found user in deserializeUser: ${JSON.stringify(userMatch)}`)
// 			done(null, userMatch)
// 		})
// 	})
// }

// module.exports = {
// 	serializeUser,
// 	deserializeUser
// }
