const express = require('express')
const router = express.Router()
const User = require('../db/models/user')

router.get('/', (req, res) => {
	res.json({ test: true })
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

router.post()

module.exports = router
