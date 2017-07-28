const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
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
// app.use(cookieParser())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)
// ===== testing middleware =====
app.use(function(req, res, next) {
	console.log('===== passport user =======')
	console.log(req.session)
	console.log(req.user)
	console.log('===== END =======')
	next()
})

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session())

/* Express app ROUTING */
// ==== ROUTES FOR TESTING ======
app.get('/login', (req, res) => {
	var path = require('path')
	if (req.user) {
		console.log('YOU ARE SIGNED IN!!!!')
		return res.redirect('/logout')
	} else {
		return res.sendFile(path.join(__dirname, './html/login.html'))
	}
})
app.get('/logout', (req, res) => {
	var path = require('path')
	res.sendFile(path.join(__dirname, './html/logout.html'))
})
app.get('/home', (req, res, next) => {
	var path = require('path')
	passport.authenticate('local', function(err, user, info) {
		console.log('USER from passport.authenticate')
		console.log(user)
		return res.json({ msg: 'yo' })
	})(req, res, next)
	// res.sendFile(path.join(__dirname, './html/home.html'))
})

app.use('/auth', require('./auth'))
// app.get('/api/data', (req, res) => {
// 	res.json({ data: ['a', 'b', 'c'] })
// })

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
