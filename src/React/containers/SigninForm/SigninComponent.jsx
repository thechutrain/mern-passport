import React, { Component } from 'react'
import SigninForm from './SigninForm'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { localSignIn } from '../../../Redux/authentication'
import store from '../../../Redux'

class SigninComponent extends Component {
  constructor(){
    super()
    this.signinHandler = this.signinHandler.bind(this)
  }
  signinHandler (formData) {
    console.log(formData)
    store.dispatch(localSignIn(formData.username, formData.password))
  }
  render (){
    return (
      <div className="SigninComponent">
        { this.props.loggedIn && (
          <Redirect to='/'/>
        )}
        <h2>Sign in here</h2>
        <SigninForm signinHandler={this.signinHandler} />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    loggedIn: store.authenticate.loggedIn
  }
}

export default connect(mapStateToProps)(SigninComponent)