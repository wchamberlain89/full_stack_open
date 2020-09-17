const initialState = {
  message: ''
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return { message: action.data.message }
    case 'CLEAR_MESSAGE':
      return initialState
    default : 
      return state
  }
}

export const clearMessage = () => ({
  type: 'CLEAR_MESSAGE'
})

export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  data: { message }
}) 

export default notificationReducer