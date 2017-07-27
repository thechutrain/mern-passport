const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
mongoose.promise = Promise
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI)
} else {
	mongoose.connect('mongodb://localhost/mern-boilerplate') // local mongo url
}
const db = mongoose.connection
db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`)
})
db.once('open', () => {
	console.log('You have successfully connected to your mongo database')
})

/* Express app ROUTING
* - this is where we set up the API routes for our application
* - Remember those 4 HTTP verbs ;)
*/
app.use(require('./controllers/apiRoutes'))
// app.get('/api/data', (req, res) => {
// 	res.json({ data: ['a', 'b', 'c'] })
// })

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
