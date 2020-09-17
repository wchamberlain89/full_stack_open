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

export default { 
  getAllAnecdotes,
  createAnecdote 
}