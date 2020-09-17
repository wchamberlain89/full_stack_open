import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (handleSubmit) => {
  const dispatch = useDispatch()

  const onCreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onCreateAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;