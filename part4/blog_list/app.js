const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middlewear = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authRouter = require('./controllers/authentication')

const User = require('./models/users')
const Blog = require('./models/blogs')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    logger.info('connected to MongoDB ++++++++++')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if(process.env.NODE_ENV === 'development') {
  app.use('/deleteALL', async( request, response ) => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    response.status(200).end()
  })
}

app.use(middlewear.unknownEndpoint)
app.use(middlewear.errorHandler)

module.exports = app