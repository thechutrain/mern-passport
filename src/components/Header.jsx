import React from 'react'
// TODO - add proptypes

const Header = props => {
	if (props.user) {
		// const name = props.user.local.username || props.
		return (
			<div className="Header">
				<p>
					Welcome back, ---
					{/* {props.user.local.username || props.user.firstName} */}
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
