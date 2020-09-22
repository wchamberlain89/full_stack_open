import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { setNotification } from './redux/reducers/notification'
import { setUser } from './redux/reducers/userReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Navigation from './components/Navigation'
import BlogDetails from './components/BlogDetails'
import Notification from './components/Notification'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './components/LoginPage'

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
      <Switch>
        <PrivateRoute path='/users/:id'>
          <UserDetails />
        </PrivateRoute>
        <PrivateRoute path='/users'>
          <Users />
        </PrivateRoute>
        <Route path='/login'>
          <>
            <LoginPage />
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