import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

let RegisterForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(formData){
    console.log(formData)
    debugger
  }
  render() {
    // <RegisterForm handleSubmit={this.handleSubmit} />
    return (
      <RegisterForm onSubmit={this.handleSubmit}/>
    )
  }
}