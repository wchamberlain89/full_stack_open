import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import Blogs from './components/Blogs'
import Navigation from './components/Navigation'
import BlogDetails from './components/BlogDetails'
import { setNotification } from './redux/reducers/notification'
import { initBlogs } from './redux/reducers/blogsReducer'
import { setUser } from './redux/reducers/userReducer'
import PrivateRoute from './components/PrivateRoute'

import './styles.css'
import UserDetails from './components/UserDetails'

const App = () => {
  const dispatch = useDispatch()

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
      <h1 style={{ 'textAlign': 'center' }}>BLOGGER</h1>
      <Navigation />
      <Switch>
        <PrivateRoute path='/users/:id'>
          <UserDetails />
        </PrivateRoute>
        <PrivateRoute path='/users'>
          <Users />
        </PrivateRoute>
        <Route path='/login'>
          <>
            <LoginForm onSuccess={(user) => {
              window.localStorage.setItem(
                'blogapp-user', JSON.stringify(user)
              )
              setNotification('Successfully logged in!')
              setUser(user)
            }}/>
          </>
        </Route>
        <PrivateRoute path='/blogs/:id'>
          <BlogDetails />
        </PrivateRoute>
        <PrivateRoute path='/'>
          <Blogs />
        </PrivateRoute>
      </Switch>
    </div>
  )
}

export default App