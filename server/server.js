// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
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

// Seems like deserialize doesn't clear req.user prior
app.use(function(req, res, next) {
	// req.user = { _id: 123123123, name: 'bad hack' }
	req.user = null // patch
	next()
})

// ===== DEBUGGING ======
// app.use((req, res, next) => {
// 	console.log(' ------- req.user BEFORE PASSPORT--------')
// 	console.log(req.user)
// 	console.log('=========================')
// 	next()
// })
// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== DEBUGGING ======
// app.use((req, res, next) => {
// 	console.log(' ------- req.user --------')
// 	console.log(req.user)
// 	console.log('=========================')
// 	next()
// })

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))

// for testing!
app.get('/api/data', (req, res) => {
	if (!req.isAuthenticated()) {
		return res.json({ Error: 'You must be authenticated!' })
	}
	console.log('/api/data ........ req.user!!!')
	console.log(req.user)
	res.json({ secretMessage: 'I like turtles' })
})

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
