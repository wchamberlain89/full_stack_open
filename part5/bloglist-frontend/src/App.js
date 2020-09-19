import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import { setNotification } from './redux/reducers/notification'
import { initBlogs } from './redux/reducers/blogsReducer'
import { setUser } from './redux/reducers/userReducer'
import './styles.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogapp-user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('blogapp-user')
    dispatch(setNotification('Successfully Logged Out'))
    dispatch(setUser(null))
  }

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
        {blogs && blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App