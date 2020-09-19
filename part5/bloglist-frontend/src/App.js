import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import { setNotification } from './redux/reducers/notification'
import './styles.css'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
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
    dispatch(setNotification('Successfully created new blog'))
    setBlogs(blogs.concat(newBlog))
  }

  const updateBlog = (updatedBlog) => {
    console.log(updatedBlog)
    const updatedBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    console.log(updatedBlogs)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const logout = () => {
    window.localStorage.setItem('blogapp-user', JSON.stringify(user))
    dispatch(setNotification('Successfully Logged Out'))
    setUser(null)
  }

  // const setNotification = (message) => {
  //   setMessage(message)
  //   setTimeout(() => {
  //     setMessage(null)
  //   }, 3000)
  // }

  return (
    <div className="app__container">
      <Notification />
      <div>
        <h2 style={{ 'text-align': 'center' }}>blogs</h2>
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
                    console.log('error is ', error)
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
      </div>
      <div className="blogs__container">
        {blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} onDeleteBlog={deleteBlog} onUpdateSuccess={updateBlog} />
        )}
      </div>
    </div>
  )
}

export default App