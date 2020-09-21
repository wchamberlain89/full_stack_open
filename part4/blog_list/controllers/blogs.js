const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const Comment = require('../models/comments')

const getToken = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
      .populate('comments')

    if (blogs) {
      response.status(200).json(blogs)
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

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
  console.log('attempting to update blog')
  const id = request.params.id
  const body = request.body

  Blog.findByIdAndUpdate(id, body, { new: true })
    .then(updatedBlog => {
      console.log(updatedBlog, 'updated blog')
      response.status(200).json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const token = getToken(request)
  let decodedToken = null
  console.log('id is ', id)
  console.log(token, 'token is ')
  if(token) {
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  console.log(token, decodedToken.id)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)

  if(blog.user.toString() === decodedToken.id) {
    try {
      await Blog.deleteOne({ _id: blog.id })
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  }
})

blogsRouter.post('/:blogId/comments', async (request, response, next) => {
  const blogId = request.params.blogId
  const comment = new Comment(request.body)

  try {
    const savedComment = await comment.save()
    const blog = await Blog.findById(blogId)
    blog.comments.unshift(savedComment)
    blog.save()
    response.status(200).json(savedComment)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter