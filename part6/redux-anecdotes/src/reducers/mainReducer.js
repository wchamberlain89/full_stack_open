import { combineReducers } from 'redux'
import anecdoteReducer from './anecdoteReducer'

export default combineReducers(
  { 
    anecdotes: anecdoteReducer 
  }
)