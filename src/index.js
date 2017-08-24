import React from 'react'
import ReactDOM from 'react-dom'
import App from './React/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// Redux dependencies
import { Provider } from 'react-redux'
import { store } from './Redux/store'

ReactDOM.render(
	<Provider store={store} >
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
