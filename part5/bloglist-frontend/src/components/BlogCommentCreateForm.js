import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createBlogComment } from '../redux/reducers/blogsReducer'

const BlogCommentCreateForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    dispatch(createBlogComment(blogId, { content: data.blogComment }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name='blogComment' ref={register} type='text' />
      <button type='submit'>Add Comment</button>
    </form>
  )
}

export default BlogCommentCreateForm