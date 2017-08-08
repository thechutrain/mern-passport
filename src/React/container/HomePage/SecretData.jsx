import React, { Component } from 'react'
import axios from 'axios'

// const SecretData = props => {}
class SecretData extends Component {
	constructor() {
		super()
		this.state = {
			secretData: null
			// errorMessage: null
		}
	}
	componentDidMount() {
		axios.get('/api/data').then(response => {
			console.log('Get data')
			console.log(response)
			if (response.status === 200) {
				this.setState({
					secretData: response.data.secretMessage
				})
			}
		})
	}
	render() {
		const message = this.state.secretData
			? this.state.secretData
			: 'no data to show'
		return (
			<div className="SecretData">
				<h3>secret data</h3>
				<p>
					{message}
				</p>
			</div>
		)
	}
}

export default SecretData
