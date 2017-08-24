import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

let RegisterForm = props => {
  const { handleSubmit, myHandleSubmit } = props
  return (
    <form onSubmit={handleSubmit(myHandleSubmit)}>
      <button type="submit">Register</button>
    </form>
  )
}

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm)

// Component that wraps the Register form
export default class RegisterComponent extends Component {
  constructor(){
    super()
    this.myHandleSubmit = this.myHandleSubmit.bind(this)
  }
  myHandleSubmit(formData){
    console.log(formData)
    debugger
  }
  render() {
    // <RegisterForm handleSubmit={this.handleSubmit} />
    return (
      <RegisterForm myHandleSubmit={this.myHandleSubmit}/>
    )
  }
}