import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import login from '../services/login'
import { setNotification } from '../redux/reducers/notification'
import { setUser } from '../redux/reducers/userReducer'
function LoginForm() {
  const history = useHistory()
  const dispatch = useDispatch()

  const initialFormstate = {
    username: '',
    password: ''
  }
  const [formState, setFormState] = React.useState(initialFormstate)

  const onInputChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value })
    console.log(formState)
  }

  const onLogin = async ({ username, password }) => {
    try {
      const response = await login({ username, password })
      dispatch(setNotification('Successfully Logged In'))
      dispatch(setUser(response))
    } catch (error) {
      setFormState(initialFormstate)
      console.log(error)
    } finally {
      history.push('/')
    }
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      onLogin(formState)
    }}>
      <label htmlFor='name'>Username :</label>
      <input type='text' name="username" onChange={onInputChange}/>
      <label htmlFor='password'>Password :</label>
      <input type='password' name="password" onChange={onInputChange}/>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm