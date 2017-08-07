import React, { Component } from 'react'
import withLoading from '../../components/isLoadingHOC'
import SecretData from './SecretData'
// TODO - add proptypes

class Home extends Component {
	constructor() {
		super()
	}
	render() {
		if (this.props.user) {
			return (
				<div className="Home">
					<p>Current User:</p>
					<code>
						{JSON.stringify(this.props)}
					</code>
					<SecretData />
				</div>
			)
		} else {
			return (
				<div className="Home">
					<h2>This is the home page</h2>
					<p>Current User:</p>
					<code>
						{JSON.stringify(this.props)}
					</code>
					<SecretData />
				</div>
			)
		}
	}
}

export default withLoading(Home, true)
