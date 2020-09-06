import React from 'react'
import { useForm } from 'react-hook-form'
import blogService from '../services/blogs'

const BlogForm = ({ user, onSubmitSuccess, onError }) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    blogService.setToken(user.token)

    blogService.addBlog(data).then((response) => {
      console.log('response successful', response)
      onSubmitSuccess(response)
    }).catch(error => {
      console.log(error)
      onError && onError(error.response)
    })
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