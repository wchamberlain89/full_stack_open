
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import './styles.scss'

const NavLink = ({ onClick, children }) => {
  const handleClick = () => {
    onClick()
  }
  return <button className='nav-link' onClick={handleClick}>{children}</button>
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  return (
    <div className='page-wrapper'>
      {token && <h3>Logged In As : {token}</h3>}
      <nav className='nav-bar'>
        <NavLink onClick={() => {
          console.log('calling setPate')
          setPage('authors')
        }}>authors</NavLink>
        <NavLink onClick={() => setPage('books')}>books</NavLink>
        <NavLink onClick={() => setPage('add')}>add book</NavLink>
        <NavLink onClick={() => setPage('login')}>Login</NavLink>
      </nav>
      <div className='page-view__container'>
        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
        />

        <NewBook
          show={page === 'add'}
        />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
        />
      </div>

    </div>
  )
}

export default App