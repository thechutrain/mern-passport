const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
// const { serializeUser, deserializeUser } = require('./passport')
const passport = require('./passport')
// const User = require('./db/models/user')
const app = express()
const PORT = process.env.PORT || 8080

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)
// ===== Passport ====
// serializeUser()
// deserializeUser()
// passport.serializeUser((user, done) => {
// 	console.log(`User from serialize User: ${user}`)
// 	done(null, user._id)
// })
// passport.deserializeUser((id, done) => {
// 	User.findOne({ _id: id }).exec(userMatch => {
// 		console.log(`Found user in deserializeUser: ${JSON.stringify(userMatch)}`)
// 		done(null, userMatch)
// 	})
// })
app.use(passport.initialize())
app.use(passport.session())

/* Express app ROUTING */
app.use('/auth', require('./auth'))
// app.get('/api/data', (req, res) => {
// 	res.json({ data: ['a', 'b', 'c'] })
// })

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
