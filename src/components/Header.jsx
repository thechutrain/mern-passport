import React from 'react'
// TODO - add proptypes

const Header = props => {
	if (props.user) {
		return (
			<div className="Header">
				<p>
					Welcome back, {props.user.email}
				</p>
			</div>
		)
	} else {
		return (
			<div className="Header">
				<p>Hello guest</p>
			</div>
		)
	}
}

export default Header
