import React from 'react'

const  BlogCommentsList = ({ comments }) => {
  return (
    <ul>
      { comments.map(comment => <BlogCommentsListItem key={comment.id} content={comment.content}/> )}
    </ul>
  )
}

const BlogCommentsListItem = ({ content }) => {
  return <li>{content}</li>
}

export default BlogCommentsList