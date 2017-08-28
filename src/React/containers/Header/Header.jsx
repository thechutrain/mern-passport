import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import NavLinks from './NavLinks'
// import withLoading from '../../components/isLoadingHOC'
// import './Header.css'
// TODO - add proptypes

// const Header = props => {
// 	let Greeting
// 	if (props.user === null) {
// 		Greeting = <p>Hello guest</p>
// 	} else if (Object.hasOwnProperty.call(props.user, 'firstName')) {
// 		Greeting = (
// 			<p>
// 				Welcome back, <strong>{props.user.firstName}</strong>
// 			</p>
// 		)
// 	} else if (Object.hasOwnProperty.call(props.user, 'local')) {
// 		Greeting = (
// 			<p>
// 				Welcome back, <strong>{props.user.local.username} </strong>
// 			</p>
// 		)
// 	} else {
// 		Greeting = <p>Hello guest</p>
// 	}
// 	return (
// 		<div className="Header">
// 			<NavLinks _logout={props._logout} loggedIn={props.loggedIn} />
// 			{Greeting}
// 		</div>
// 	)
// }

class Header extends Component {
	constructor(){
		super()
	}
	render() {
		// const {user} = this.props
		// <NavLinks _logout={this.props.logout} loggedIn={this.props.loggedIn} />
		return (
			<div className="Header">
				<Link to="/register">register</Link>
			</div>
		)
	}

}

export default Header
// export default withLoading(Header)
