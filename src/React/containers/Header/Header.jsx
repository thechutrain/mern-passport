import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import  store from '../../../Redux'
import { signOut } from '../../../Redux/authentication'
import './Header.css'

// class Header extends Component {
// 	render() {
// 		return (
// 			<div className="Header">
// 				<Link to="/">Home</Link>
// 				<Link to="/register">register</Link>
// 				<Link to="/signin">signin</Link>
// 				<Link to="/" onClick={this.props.logout}>Logout</Link>
// 			</div>
// 		)
// 	}

// }
const Header = props => {
	return (
		<div className="Header">
			<Link to="/">Home</Link>
			<Link to="/register" className={props.loggedIn ? 'hidden' : null}>register</Link>
 			<Link to="/signin" className={props.loggedIn ? 'hidden' : null}>signin</Link>
			<Link to="/" onClick={props.logout} className={props.loggedIn ? null : 'hidden'}>Logout</Link>
		</div>
	)
}

const mapStateToProps = function (store) {
	return {
		loggedIn: store.authenticate.loggedIn,
		// TODO - user name here ...
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => { dispatch(signOut()) }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
// export default withLoading(Header)
