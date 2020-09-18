const initialState = {
  message: ''
}

let timerId;

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

export const setMessage = (message, duration = 1000) => {
  return async (dispatch) => {
    if(timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      dispatch(clearMessage())
    }, duration)
    dispatch({
      type: 'SET_MESSAGE',
      data: { message }
    })
  }
}

export default notificationReducer