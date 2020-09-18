import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (data) => {
  const newAnecdote = data;
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

export default { 
  createAnecdote, 
  getAllAnecdotes,
  updateAnecdote,
}