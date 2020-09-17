const initialState = {
  message: ''
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return { message: action.data.message }
    default : 
      return state
  }
}

export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  data: { message }
}) 

export default notificationReducer