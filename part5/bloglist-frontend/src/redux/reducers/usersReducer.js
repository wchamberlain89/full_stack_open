import usersService from '../../services/users'

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return [...action.data]
  default:
    return state
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    console.log('using init users actions')
    const users = await usersService.getUsers()

    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer