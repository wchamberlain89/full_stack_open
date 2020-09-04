const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const notesInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, notesInDb
}