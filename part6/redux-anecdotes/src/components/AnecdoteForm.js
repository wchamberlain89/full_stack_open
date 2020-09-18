import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const AnecdoteForm = (handleSubmit) => {
  const dispatch = useDispatch()

  const onCreateAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = asObject(event.target.anecdote.value)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
    dispatch(setMessage('Succussfully Created Anecdote', 5000))
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