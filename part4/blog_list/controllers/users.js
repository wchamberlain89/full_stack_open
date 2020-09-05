const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    if(users) {
      response.status(200).json(users)
    }
    response.status(400).end()
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if(!body.passwordHash || body.passwordHash.length < 3) {
    return response.status(400).json({ error: 'password must be more than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash: passwordHash,
    name: body.name
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch(exception) {
    next(exception)
  }
})


module.exports = usersRouter