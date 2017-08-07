import React from 'react'
import NavLinks from './NavLinks'
import withLoading from '../isLoadingHOC'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <p>Hello guest</p>
	} else if (Object.hasOwnProperty.call(props.user, 'firstName')) {
		Greeting = (
			<p>
				Welcome back, <strong>{props.user.firstName}</strong>
			</p>
		)
	} else if (Object.hasOwnProperty.call(props.user, 'local')) {
		Greeting = (
			<p>
				Welcome back, <strong>{props.user.local.username} </strong>
			</p>
		)
	} else {
		Greeting = <p>Hello guest</p>
	}
	return (
		<div className="Header">
			<NavLinks _logout={props._logout} loggedIn={props.loggedIn} />
			<p>
				Greeting: {Greeting}
			</p>
		</div>
	)
}

export default withLoading(Header)
