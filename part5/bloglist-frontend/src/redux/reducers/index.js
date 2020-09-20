import { combineReducers } from 'redux'
import blogs from './blogsReducer'
import notification from './notification'
import user from './userReducer'
import users from './usersReducer'
const rootReducer = combineReducers({ blogs, notification, user, users })

export default rootReducer