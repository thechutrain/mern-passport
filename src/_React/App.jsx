import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import LoginForm from './container/LoginPage/Login/LoginForm'
import SignupForm from './container/LoginPage/SignupForm'
import Home from './container/HomePage/Home'

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: null,
			user: null,
			isLoading: true
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		// ====== for testing the loading purposes =======
		// TODO - remove the setTimeout later ...
		setTimeout(
			function() {
				axios.get('/auth/user').then(response => {
					if (!!response.data.user) {
						this.setState({
							loggedIn: true,
							user: response.data.user,
							isLoading: false
						})
					} else {
						this.setState({
							loggedIn: false,
							user: {},
							isLoading: false
						})
					}
				})
			}.bind(this),
			1000
		)
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: {}
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
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
		return (
			<div className="App">
				{/* -- HEADER COMPONENT --
					* contains Navigation bar with LINKS
					* Message to user etc.
					*/}
				{/* <Header user={this.state.user} /> */}
				{/* LINKS to our different 'pages' */}
				{/* <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} /> */}
				<Header
					_logout={this._logout}
					{...this.state}
					// loggedIn={this.state.loggedIn}
					// user={this.state.user}
					// isLoading={this.state.isLoading}
				/>
				{/*  ROUTES */}
				<Route exact path="/" render={() => <Home {...this.state} />} />

				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route exact path="/signup" component={SignupForm} />
				{/* <LoginForm _login={this._login} /> */}
			</div>
		)
	}
}

export default App
