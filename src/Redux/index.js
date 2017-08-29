import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
// Reducers
import authenticationReducer from './authentication.js'
import { reducer as formReducer } from 'redux-form'
// testing purposes
import * as auth from './authentication'
/********* Redux Reducer*********
*
*/
const reducers = combineReducers({
  authenticate: authenticationReducer,
  form: formReducer
})

/********* Redux Store *********
*
*/
let store
if (process.env.NODE_ENV === 'production') {
	store = createStore(reducers, applyMiddleware(thunk, createLogger()))
} else {
	store = createStore(
		reducers,
		compose(
			// with logger in console
			// applyMiddleware(thunk, createLogger()),
			applyMiddleware(thunk),
			typeof window === 'object' &&
			typeof window.devToolsExtension !== 'undefined'
				? window.devToolsExtension()
				: f => f
		)
	)
}

/********* Exports *********
*
*/
export default store


// ========== testing =========
// store.dispatch(auth.localSignIn('b', 'b')) // the correct password
store.dispatch(auth.signOut())  // this will actually happen first!

// store.dispatch(auth.localSignIn('b', 'wrong password'))  // the wrong password