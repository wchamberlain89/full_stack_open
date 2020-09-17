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

  const sortByVotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const filterAnecdotes = (filter) => {
    return anecdotes.filter(a => a.content.includes(filter) ? a : null)
  }

  const filteredAnecdotes = filterAnecdotes(filter)

  return (
    <>
      <Filter />
      {filteredAnecdotes.map(anecdote =>
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