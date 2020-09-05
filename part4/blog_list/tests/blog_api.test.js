const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const User = require('../models/users')
const helpers = require('./test_helper')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Zoro Kusunagi',
    url: 'www.someurl.com',
    likes: 16
  },
  {
    title: 'Second Blog',
    author: 'Monkey D. Luffy',
    url: 'www.someurl.com',
    likes: 13
  },
  {
    title: 'Third Blog',
    author: 'Zoro Kusunagi',
    url: 'www.someurl.com',
    likes: 10
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})


test('notes are returned as JSON', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('The first note to have a correct title', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('First Blog')
})

test('Returned blogs have id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('A new blog is added to the database', async () => {
  const newBlog =
  {
    title: 'New Test Blog',
    author: 'Zoro Kusunagi',
    url: 'www.someurl.com',
    likes: 16
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(response => response.title)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('New Test Blog')
})

test('likes are added with default value of 0', async () => {
  const newBlog =
  {
    title: 'Newest Test Blog',
    author: 'Captain Usopp',
    url: 'www.someurl.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body.filter(blog => blog.title === 'Newest Test Blog')[0]
  expect(addedBlog.likes).toBe(0)
})

test('Title must be included with request body', async () => {
  const newBlog =
  {
    author: 'Captain Usopp',
    url: 'www.someurl.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('Url must be included with request body', async () => {
  const newBlog =
  {
    title: 'Blog without URL',
    author: 'Captain Usopp'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

describe('Deleting a blog', () => {
  test('Succeeds with status code 204 if id is valid', async () => {
    let allBlogs = await Blog.find({})
    allBlogs = allBlogs.map(blog => blog.toJSON())
    const blogToDelete = allBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const remainingBlogs = await Blog.find({})

    expect(remainingBlogs).toHaveLength(initialBlogs.length - 1)

    const ids = remainingBlogs.map(blog => {
      blog = blog.toJSON()
      return blog.id
    })

    expect(ids).not.toContain(blogToDelete.id)
  })
})

describe('Updating a blog', () => {
  test('Sucessfully updates a blogs likes', async () => {
    let allBlogs = await Blog.find({})
    const blogToUpdate = allBlogs[0].toJSON()

    const newData =
    {
      likes: 100
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newData)
      .expect(200)

    allBlogs = await Blog.find({})
    expect(allBlogs[0].likes).toBe(newData.likes)
  })
})

//USER TESTS

describe('when there is initially on user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({ username: 'root-user', passwordHash: 'password', name: 'frankie' })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const startingBlogs = await helpers.usersInDb()
    const newUser = {
      username: 'reinhardt',
      name: 'frankie',
      passwordHash: 'something'
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

describe('Adding invalid users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({ username: 'root-user', passwordHash: 'password', name: 'frankie' })

    await user.save()
  })

  test('username cannot be undefined', async () => {
    const startingUsers = await helpers.usersInDb()

    const newUser = {
      name: 'Frankie',
      passwordHash: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newUsers = await helpers.usersInDb()

    expect(newUsers).toHaveLength(startingUsers.length)
  })

  test('passwordHash cannot be undefined', async () => {
    const startingUsers = await helpers.usersInDb()

    const newUser = {
      name: 'Frankie',
      username: 'BattleshipOfLove'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newUsers = await helpers.usersInDb()

    expect(newUsers).toHaveLength(startingUsers.length)
  })

  test('username must be at least 3 characters', async () => {
    const startingUsers = await helpers.usersInDb()

    const newUser = {
      name: 'Frankie',
      username: '01',
      passwordHash: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newUsers = await helpers.usersInDb()

    expect(newUsers).toHaveLength(startingUsers.length)
  })

  test('password must be at least 3 characters', async () => {
    const startingUsers = await helpers.usersInDb()

    const newUser = {
      name: 'Frankie',
      username: '123',
      passwordHash: 'pw'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newUsers = await helpers.usersInDb()

    expect(newUsers).toHaveLength(startingUsers.length)
  })

  test('username must be unique', async () => {
    const startingUsers = await helpers.usersInDb()
    console.log(startingUsers)
    const newUser = {
      name: 'Frankie',
      username: 'root-user',
      passwordHash: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newUsers = await helpers.usersInDb()

    expect(newUsers).toHaveLength(startingUsers.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})