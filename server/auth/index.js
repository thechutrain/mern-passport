const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post('/login', passport.authenticate('local'), (req, res) => {
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
})

router.post('/signup', (req, res) => {
	const { email, password } = req.body
	// ADD VALIDATION
	const newUser = new User({ email, password })
	newUser.save((err, savedUser) => {
		if (err) return res.json(err)
		return res.json(savedUser)
	})
})

module.exports = router
