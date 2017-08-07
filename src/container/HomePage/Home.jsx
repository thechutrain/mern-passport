import React from 'react'
import SecretData from './SecretData'
// TODO - add proptypes

const Home = props => {
	if (props.user) {
		return (
			<div className="Home">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
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
					{JSON.stringify(props)}
				</code>
				<SecretData />
			</div>
		)
	}
}

export default Home
