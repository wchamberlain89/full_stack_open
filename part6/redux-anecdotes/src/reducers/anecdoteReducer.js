import anecdoteService from '../services/anecdotes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return [...action.data]

    case 'CREATE_ANECDOTE':
      return [...state, action.data]

    case 'UPVOTE':
      const id = action.data.id;
      const anecdoteToUpdate = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)

    default: 
      return state
  }
}

//ACTION CREATORS////
export const createAnecdote = (anecdote) => {
  return { type: 'CREATE_ANECDOTE', data: anecdote }
}

export const upvote = (id) => {
  return { 
    type: 'UPVOTE', 
    data: { id } 
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer