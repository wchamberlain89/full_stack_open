const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')

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
  console.log('response is: ', response.body)
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})