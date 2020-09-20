import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import BlogsList from './BlogsList'
import { initBlogs } from '../redux/reducers/blogsReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])
  const blogFormRef = React.useRef()
  return (
    <>
      <Toggleable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm />
      </Toggleable>
      <BlogsList />
    </>
  )
}

export default Blogs