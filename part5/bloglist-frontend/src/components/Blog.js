import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../redux/reducers/blogsReducer'

const Blog = ({ blog, onUpdateSuccess, onDeleteBlog, user }) => {
  const [showDetails, setShowDetails] = React.useState()
  const dispatch = useDispatch()

  return (
    <div className="blog">
      <div>
        <h3> { blog.title } </h3>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : ' view details'}</button>
      </div>
      {
        showDetails &&
        <div className="blog__blog-details">
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <div className="likes">
            <p>{blog.likes}</p>
            <button className="upvote-btn">upvote</button>
          </div>
          <button onClick={() => dispatch(deleteBlog(blog.id))}>Delete</button>
        </div>
      }
    </div>
  )
}

export default Blog