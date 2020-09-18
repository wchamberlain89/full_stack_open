import React from 'react'
import { connect } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props

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

const mapDispatchToProps = {
  upvote
}

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter
})


export default connect(mapStateToProps)(AnecdoteList);