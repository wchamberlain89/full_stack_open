import { combineReducers } from 'redux'
import blogs from './blogsReducer'
import notification from './notification'
import user from './userReducer'

const rootReducer = combineReducers({ blogs, notification, user })

export default rootReducer