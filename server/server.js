const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

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
