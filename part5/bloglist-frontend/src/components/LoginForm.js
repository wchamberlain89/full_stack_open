import React from 'react'
import login from '../services/login'

function LoginForm({ onSuccess }) {
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