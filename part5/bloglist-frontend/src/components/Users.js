import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from '../redux/reducers/usersReducer'

const User = ({ user }) => {
  console.log(user)
  return (
    <div style={{ display: 'flex' }}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      <div style={{ marginLeft: '5px' }}>{user.blogs.length}</div>
    </div>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  return (
    <div>
      <ul>
        { users.map(user => <li key={user.id}><User user={user}/></li>) }
      </ul>
    </div>
  )
}

export default Users