import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'
// testing purposes
import * as auth from './authentication'

let store

if (process.env.NODE_ENV === 'production') {
	store = createStore(reducer, applyMiddleware(thunk, createLogger()))
} else {
	store = createStore(
		reducer,
		compose(
			applyMiddleware(thunk, createLogger()),
			typeof window === 'object' &&
			typeof window.devToolsExtension !== 'undefined'
				? window.devToolsExtension()
				: f => f
		)
	)
}

export default store

// ========== testing =========
store.dispatch(auth.signOut())