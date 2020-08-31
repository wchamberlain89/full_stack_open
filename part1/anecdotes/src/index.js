import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ anecdote, votes, onUpvote }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has { votes || 0 } votes</p>
      <button onClick={onUpvote}>Upvote</button>
    </div>
  )
}

const App = (props) => {
  const { anecdotes } = props;
  const [selected, setSelected] = useState(0);
  const [result, setResult] = useState(0);
  const [upvotes, setupvotes] = useState({});
  
  const upvote = (id) => {
    setupvotes({ ...upvotes, [id]: upvotes[id] + 1  || 1 })
  }

  const random = (max) => {
    let randomNumber = Math.floor((Math.random() * max))
    return randomNumber;
  }

  const handleClick = () => {
    setSelected(random(anecdotes.length));
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} onUpvote={() => upvote(selected)} votes={upvotes[selected]}/>
      <button onClick={() => {handleClick()}}>Next </button> 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)