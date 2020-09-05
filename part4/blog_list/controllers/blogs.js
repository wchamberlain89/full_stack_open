const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    if (blogs) {
      response.status(200).json(blogs)
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    user.save()
    response.status(200).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  Blog.findByIdAndUpdate(id, body, { new: true })
    .then(updatedBlog => {
      response.status(200).json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter