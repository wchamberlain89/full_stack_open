const mongoose = require('mongoose')
const User = require('../models/users')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helpers = require('./test_helper')

describe('when there is initially on user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({ username: 'root-user', passwordHash: 'password' })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const startingBlogs = await helpers.usersInDb()
    const newUser = {
      username: 'reinhardt',
      name: 'frankie',
      password: 'something'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endingBlogs = await helpers.usersInDb()
    expect(endingBlogs).toHaveLength(startingBlogs.length + 1)

    const userNames = endingBlogs.map(blog => blog.username)
    expect(userNames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})