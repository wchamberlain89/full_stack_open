const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data.notification
  default:
    return state
  }
}

export const setNotification = (notification) => {
  console.log('attempting to set notification with notification ', notification)
  return async (dispatch) => {
    console.log('running')
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }
    })
  }
}

export default notificationReducer