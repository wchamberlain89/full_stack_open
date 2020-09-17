import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers/mainReducer'
import thunk from 'redux-thunk'

export default createStore(mainReducer, applyMiddleware(thunk))