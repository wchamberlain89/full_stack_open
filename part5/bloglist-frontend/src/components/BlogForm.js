import React from 'react';
import { useForm } from 'react-hook-form'
import blogService from '../services/blogs'

const BlogForm = ({ user, onSubmitSuccess, onError }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    blogService.setToken(user.token)

    blogService.addBlog(data).then((response) => {
      console.log(response)
      onSubmitSuccess(response)
    }).catch(error => {
      onError && onError(error.response.data.error)
    })
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label for='title'>Title</label>
        <input
          ref={register}
          name='title'
        />
        <label for='title'>Url</label>
        <input
          ref={register}
          name='url'
        />
        <button type="submit">save</button>
      </form>
    )
};

export default BlogForm;