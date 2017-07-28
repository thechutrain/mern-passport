const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')

// router.post('/login', passport.authenticate('local'), (req, res, next) => {
// 	const { email, password } = req.body
// 	User.findOne({ email }, (err, user) => {
// 		console.log(user)
// 		if (!user) {
// 			return res.json({ msg: 'no user found' })
// 		} else if (!user.checkPassword(password)) {
// 			return res.json({ msg: 'incorrect password' })
// 		} else {
// 			req.login(user, function(err) {
// 				console.log(`USER FROM req.login: ${JSON.stringify(user)}`)
// 				// sends back the user & passport creates a session for that user
// 				// return err ? next(err) : res.json(user)
// 				return err ? next(err) : res.redirect('/home')
// 			})
// 		}
// 	})
// })

// VERSION 1
// router.post(
// 	'/login',
// 	passport.authenticate('local', {
// 		successRedirect: '/home',
// 		failureRedirect: '/login'
// 	})
// )

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}

	// passport.authenticate('local', function(err, user, info) {
	// 	console.log('authenticate function')
	// 	if (err) {
	// 		return next(err)
	// 	}
	// 	if (!user) {
	// 		return res.json({ user: null })
	// 	}
	// 	return res.json({ user: { email: user.email, _id: user._id } })
	// })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
	console.log('POST login ========>')
	// console.log(Object.keys(res))
	// console.log(res.writeHead)
	// console.log(Object.keys(res.req))
	// console.log(res.req.headers.cookie)
	console.log('post LOGIN USER?????')
	// console.log(req.user)
	// const newUser = Object.assign({}, req.user)
	// delete newUser.password
	// console.log(newUser)
	console.log(req.user)
	// BUG - this req.user includes the password WTF
	res.json({ user: { email: req.user.email, _id: req.user._id } })
})

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
	// req.logout()
	// console.log('you are logged out')
	// res.json({ msg: 'you are logged out' })
	// res.redirect('/home')
})

router.post('/signup', (req, res) => {
	const { email, password } = req.body
	// console.log(req.body.email)
	// console.log(req.body.password)
	// ADD VALIDATION
	const newUser = new User({ email, password })
	newUser.save((err, savedUser) => {
		if (err) return res.json(err)
		return res.json(savedUser)
	})
	// return res.json({ msg: 'you hit the post signup route' })
})

module.exports = router
