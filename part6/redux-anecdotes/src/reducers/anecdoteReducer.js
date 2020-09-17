const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return [...action.data]

    case 'CREATE_ANECDOTE':
      const newAnecdote = asObject(action.data.content)
      return [...state, newAnecdote]

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
export const createAnecdote = (content) => {
  return { type: 'CREATE_ANECDOTE', data: { content } }
}

export const upvote = (id) => {
  return { 
    type: 'UPVOTE', 
    data: { id } 
  }
}

export const initializeAnecdotes = (data) => ({
  type: 'INIT_ANECDOTES',
  data
})

export default reducer