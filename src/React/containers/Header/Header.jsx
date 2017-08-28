import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import  store from '../../../Redux/store'
import { signOut } from '../../../Redux/authentication'
import './Header.css'

class Header extends Component {
	constructor(){
		super()
		this.Logout = this.Logout.bind(this)
	}
	Logout(){
		store.dispatch(signOut())
	}
	render() {
		return (
			<div className="Header">
				<Link to="/register">register</Link>
				<Link to="/signin">signin</Link>
				<Link to="/" onClick={this.Logout}>Logout</Link>
			</div>
		)
	}

}

const mapStateToProps = function(store){
	return {
		// user: store.authenticate.
	}
}
export default Header
// export default withLoading(Header)
