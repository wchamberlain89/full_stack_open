import React from 'react'
// import AnecdoteList from './components/AnecdoteList'
// import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import ConnectedAnecdoteList from './components/ConnectedAnecdoteList'
import ConnectedAnecdoteForm from './components/ConnectedAnecdoteForm'
// import ConnectedNotification from './components/ConnectedNotification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <ConnectedAnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}

export default App