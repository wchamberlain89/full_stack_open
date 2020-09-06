import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onUpdateSuccess, onDeleteBlog, user }) => {
  const [showDetails, setShowDetails] = React.useState()

  const handleDeleteBlog = () => {
    blogService.setToken(user.token)
    blogService.removeBlog(blog.id)
    onDeleteBlog && onDeleteBlog(blog.id)
  }

  const upvote = async () => {
    try {
      const response = await blogService.updateBlog(blog.id, { likes: blog.likes + 1 })
      onUpdateSuccess && onUpdateSuccess(response.data)
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div className="blog">
      <div>
        <h3>{ blog.title }</h3>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : ' view details'}</button>
      </div>
      {
        showDetails &&
        <div className="blog__blog-details">
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <div className="likes">
            <p>{blog.likes}</p>
            <button onClick={upvote}>upvote</button>
          </div>
          <button onClick={handleDeleteBlog}>Delete</button>
        </div>
      }
    </div>
  )
}

export default Blog