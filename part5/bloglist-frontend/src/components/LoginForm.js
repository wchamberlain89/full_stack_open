import React from 'react'
import { useDispatch } from 'react-redux'
import login from '../services/login'
import { setNotification } from '../redux/reducers/notification'

function LoginForm({ onSuccess }) {
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
    console.log(username, password)
    try {
      const response = await login({ username, password })
      dispatch(setNotification('Successfully Logged In'))
      onSuccess && onSuccess(response)
    } catch (error) {
      setFormState(initialFormstate)
      console.log(error)
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