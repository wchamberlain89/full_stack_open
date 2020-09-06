import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogapp-user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const addBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  const logout = () => {
    window.localStorage.setItem('blogapp-user', JSON.stringify(user))
    setUser(null)
  }
  
  return (
    <div>
      <h2>blogs</h2>
      {
        user ? 
        <>
          {user.username}
          <button onClick={logout}>Logout</button>
          <BlogForm user={user} onSubmitSuccess={addBlog}/>
        </> :
        <LoginForm onSuccess={(user) => {
          window.localStorage.setItem(
            'blogapp-user', JSON.stringify(user)
          )
          setUser(user)
        }}/>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App