import { combineReducers } from 'redux'
import authenticationReducer from './authentication.js'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  authenticate: authenticationReducer,
  form: formReducer
})
