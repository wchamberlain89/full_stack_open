import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upvote(id))
  }

  const filterAnecdotes = (filter) => {
    return anecdotes.filter(a => a.content.includes(filter) ? a : null)
  }

  const filteredAnecdotes = filterAnecdotes(filter)

  const anecdotesToDisplay = () => filter ? filteredAnecdotes : anecdotes
  
  return (
    <>
      <Filter />
      {anecdotesToDisplay().map(anecdote =>
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
    </>
  );
};

export default AnecdoteList;