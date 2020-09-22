const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data.notification
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})

export const setNotification = (notification) => {
  let notificationTimer
  return async (dispatch, getState) => {
    const currentNotification = getState().notification
    if(currentNotification) {
      clearTimeout(notificationTimer)
    }

    notificationTimer = setTimeout(() => {
      dispatch(clearNotification())
    }, 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }
    })
  }
}

export default notificationReducer