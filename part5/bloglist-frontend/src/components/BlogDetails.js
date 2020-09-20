import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, upvoteBlog } from '../redux/reducers/blogsReducer'
const BlogDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.filter(blog => blog.id === id)[0])
  console.log(blog)
  return (
    <div className="blog__blog-details">
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <div className="likes">
        <p>{blog.likes}</p>
        <button className="upvote-btn" onClick={() => dispatch(upvoteBlog(blog.id))}>upvote</button>
      </div>
      <button onClick={() => dispatch(deleteBlog(blog.id))}>Delete</button>
    </div>
  )
}

export default BlogDetails