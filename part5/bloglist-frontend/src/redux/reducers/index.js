import { combineReducers } from 'redux'
import blogs from './blogs'
import notification from './notification'

const rootReducer = combineReducers({ blogs, notification })

export default rootReducer