import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createBlog } from '../redux/reducers/blogsReducer'

const BlogForm = ({ user, onSubmitSuccess, onError }) => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(createBlog(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='title'>Title</label>
      <input
        ref={register}
        name='title'
      />
      <label htmlFor='title'>Url</label>
      <input
        ref={register}
        name='url'
      />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm