import React from 'react'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = React.useState()

  return (
    <div>
      <div>
        <h3>{ blog.title }</h3>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : ' view details'}</button>
      </div>
      {
        showDetails &&
        <div class="blog-details animate">
          <p>{blog.author}</p>
          <p>{blog.url}</p>
        </div>
      }
    </div>
  )
}

export default Blog