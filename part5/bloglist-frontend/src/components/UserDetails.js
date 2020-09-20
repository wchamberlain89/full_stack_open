import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const UserDetails = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.filter(user => user.id === id)[0])
  console.log(user)
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserDetails