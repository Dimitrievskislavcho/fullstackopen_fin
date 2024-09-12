const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const blogsRouterMiddlewear = require('./controlllers/blogs')
const usersRouter = require('./controlllers/users')
const loginRouter = require('./controlllers/login')
const { extractToken, errorHandler } = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(extractToken)
app.use('/api/blogs', blogsRouterMiddlewear)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

module.exports = app
