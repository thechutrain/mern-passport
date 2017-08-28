import React, { Component } from 'react'
import SigninForm from './SigninForm'
import { Redirect } from 'react-router'

class SigninComponent extends Component {
  constructor(){
    super()
    this.state = {
      fireRedirect: false
    }
  }
  // signinHandler (formData) {
  //   console.log(formData)
  //   debugger
  // }
  render (){
    return (
      <div className="SigninComponent">
        { this.state.fireRedirect && (
          <Redirect to='/'/>
        )}
        <h2>Sign in here</h2>
        <SigninForm></SigninForm>
      </div>
    )
  }
}

export default SigninComponent