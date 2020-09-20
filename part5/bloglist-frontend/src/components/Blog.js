import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, onUpdateSuccess, onDeleteBlog, user }) => {
  console.log('blog is ', blog)
  return (
    <div style={{ display: 'flex' }} className="blog">
      <h3> { blog.title } </h3>
      <button>
        <Link style={{ display:'block' }} to={`/blogs/${blog.id}`}>
          details
        </Link>
      </button>
    </div>
  )
}

export default Blog