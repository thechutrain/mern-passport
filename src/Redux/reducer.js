import { combineReducers } from 'redux'
import authenticationReducer from './authentication.js'

export default combineReducers({
  authenticate: authenticationReducer
})
