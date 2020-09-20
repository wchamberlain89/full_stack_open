import React from 'react';
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <div className="blogs__container">
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogsList