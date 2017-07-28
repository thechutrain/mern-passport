import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: {}
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			// console.log(response)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(email, password) {
		axios
			.post('/auth/login', {
				email,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		const formBlock = this.state.loggedIn
			? null
			: <div>
					<LoginForm _login={this._login} />
					<SignupForm />
				</div>
		const logoutBlock = this.state.loggedIn
			? <button onClick={this._logout}>LOGOUT</button>
			: null
		return (
			<div className="App">
				<h1>This is the APP component</h1>
				{/* <LoginForm _login={this._login} /> */}
				{formBlock}
				{/* <button onClick={this._logout}>LOGOUT</button> */}
				{logoutBlock}
			</div>
		)
	}
}

export default App
