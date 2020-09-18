import React from 'react'
import { connect } from 'react-redux'
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

const AnecdoteForm = (props) => {
  const { createAnecdote, setMessage } = props

  const onCreateAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = asObject(event.target.anecdote.value)
    event.target.anecdote.value = ''
    createAnecdote(newAnecdote)
    setMessage(`Succussfully Created Anecdote ${newAnecdote.content}`, 2000)
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

const mapDispatchToProps = {
  createAnecdote,
  setMessage
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);