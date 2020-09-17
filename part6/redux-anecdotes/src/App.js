import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, upvote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upvote(id))
  }

  
  const sortByVotes = (anecdotes) => {
    console.log('sorting')
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const sortedAnecdotes = sortByVotes(anecdotes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App