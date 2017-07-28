const passport = require('passport')
const User = require('../db/models/user')

passport.serializeUser((user, done) => {
	console.log(`User from serialize User: ${user}`)
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	User.findOne({ _id: id }).exec(userMatch => {
		console.log(`Found user in deserializeUser: ${JSON.stringify(userMatch)}`)
		done(null, userMatch)
	})
})

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
