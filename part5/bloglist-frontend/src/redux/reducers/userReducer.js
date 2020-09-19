const initialState = null

const userReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data.user
  default:
    return state
  }
}

export const setUser = (user) => ({
  type: 'SET_USER',
  data: { user }
})

export default userReducer