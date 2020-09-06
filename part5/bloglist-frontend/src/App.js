import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()
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
    console.log(blogFormRef.current)
    blogFormRef.current.toggleVisibilty()
    setNotification('Successfully created new blog')
    setBlogs(blogs.concat(newBlog))
  }

  const logout = () => {
    window.localStorage.setItem('blogapp-user', JSON.stringify(user))
    setNotification('Successfully Logged Out')
    setUser(null)
  }

  const setNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  
  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      {
        user ? 
        <>
          {user.username}
          <button onClick={logout}>Logout</button>
          <Toggleable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm 
              user={user} 
              onSubmitSuccess={addBlog}
              onError={(error) => {
                console.log("error is ", error)
                setNotification(error)
              }}
            />
          </Toggleable>
        </> :
        <Toggleable buttonLabel='Login'>
          <LoginForm onSuccess={(user) => {
            window.localStorage.setItem(
              'blogapp-user', JSON.stringify(user)
              )
              setNotification('Successfully logged in!')
              setUser(user)
            }}
          />
        </Toggleable>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App