const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middlewear = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB ++++++++++')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middlewear.unknownEndpoint)
app.use(middlewear.errorHandler)

module.exports = app