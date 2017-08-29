import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import  store from '../../../Redux'
import { signOut } from '../../../Redux/authentication'
import './Header.css'

class Header extends Component {
	// constructor(){
	// 	super()
	// 	this.Logout = this.Logout.bind(this)
	// }
	// Logout(){
	// 	store.dispatch(signOut())
	// }
	render() {
		return (
			<div className="Header">
				<Link to="/register">register</Link>
				<Link to="/signin">signin</Link>
				<Link to="/" onClick={this.props.logout}>Logout</Link>
			</div>
		)
	}

}

const mapStateToProps = function(store){
	return {
		loggedIn: store.authenticate.loggedIn,
		// TODO - user name here ...
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => { dispatch(signOut())}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
// export default withLoading(Header)
