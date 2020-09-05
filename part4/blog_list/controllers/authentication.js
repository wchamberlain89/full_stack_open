const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const User = require('../models/users')

authRouter.post('/login', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  console.log(user)
  const isValidPassword = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if(!(user && isValidPassword)) {
    return response.status(401).json({ error : 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = authRouter