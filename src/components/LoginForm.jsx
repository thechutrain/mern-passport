import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		// clean up the form
		// this.setState({
		// 	username: '',
		// 	password: ''
		// })
		// redirect - will clean form
		this.setState({
			redirectTo: '/'
		})
		// axios
		// 	.post('/auth/login', {
		// 		username: this.state.username,
		// 		password: this.state.password
		// 	})
		// 	.then(response => {
		// 		if (response.status === 200) {
		// 			// update the state
		// 		}
		// 		console.log(response)
		// 	})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
					<h1>Login form</h1>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<button onClick={this.handleSubmit}>Login</button>
				</div>
			)
		}
	}
}

export default LoginForm
