const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    if(users) {
      response.status(200).json(users)
    }
    response.status(400).end()
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length < 3) {
    return response.status(400).json({ error: 'password must be more than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash: passwordHash,
    name: body.name
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter