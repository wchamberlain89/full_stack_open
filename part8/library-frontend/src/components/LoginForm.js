import React from 'react'
import { gql, useMutation } from '@apollo/client'
//Checked

const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const LoginForm = ({ show, setToken }) => {
  
  const [formInputState, setFormInputState] = React.useState({
    username: '',
    password: ''
  })
  
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })
  
  React.useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])
  

  console.log(result.data && result.data.login.value)

  if (!show) {
    return null
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    login(
      { 
        variables:
          {
            username: formInputState.username, 
            password: formInputState.password 
          } 
      }
    )
  }

  const handleInputChange = (e) => {
    setFormInputState({ ...formInputState, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label for='username' name='username'>
        Username
      </label>
      <input name='username' type='text' onChange={handleInputChange}/>
      <label for='password' name='password'>
        Password
      </label>
      <input name='password' type='text' onChange={handleInputChange}/>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm