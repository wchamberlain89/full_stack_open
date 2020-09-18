import anecdoteService from '../services/anecdotes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return [...action.data]

    case 'CREATE_ANECDOTE':
      return [...state, action.data]

    case 'UPDATE_ANECDOTE':
      return state.map(a => a.id === action.data.id ? action.data : a)

    default:  
      return state
  }
}

//ACTION CREATORS////
export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: createdAnecdote
    })
  }
}

export const upvote = (id) => {
  return async (dispatch, getState) => {
    let { anecdotes } = getState();
    const updatedAnecdote = anecdotes.reduce((acc, curr) => {
      if(curr.id === id) {
        return { ...curr, votes: curr.votes + 1 }
      }
      return acc 
    }, {})
    const apiResponse = await anecdoteService.updateAnecdote(updatedAnecdote)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: apiResponse
    })
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