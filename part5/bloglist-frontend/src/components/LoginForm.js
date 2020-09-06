import React from 'react'
import login from '../services/login'

function LoginForm(props) {
  const [formState, setFormState] = React.useState()

  const onInputChange = ({ target }) => {
    setFormState({ [target.name]: target.value })
  }

  const onLogin = ({ username, password }) => {
    try {
      const user = await login({ username, password })
    }
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      onLogin(formState)
    }}>
      <label for='name'>Username :</label>
      <input type='text' name="username" onChange={onInputChange}/>
      <label for='password'>Password :</label>
      <input type='password' name="password" onChange={onInputChange}/>
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;