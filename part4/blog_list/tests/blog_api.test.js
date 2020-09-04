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

afterAll(() => {
  mongoose.connection.close()
})