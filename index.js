const express       = require('express'),
      mongoose      = require('mongoose'),
      bodyParser    = require('body-parser'),
      app           = express()

// Variables Declaration
const port = process.env.PORT || 3000

// Importing Routes and Models
const indexRoutes   = require('./routes/index')
const todoRoutes    = require('./routes/todos')
const mongoDB       = require('./models/index')

// App Config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use(indexRoutes)
app.use('/api/todos', todoRoutes)

// Server
app.listen(port, () => {
    console.log('Todos app is running on ' + port)
})