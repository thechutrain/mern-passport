import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

let RegisterForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field name="username" component="input"/>
      <button type="submit">Submit</button>
    </form>
  )
}

const validate = values => {
  const errors = {}
  return errors
}

// syncValidated form
RegisterForm = reduxForm({
  form: 'register',
  // validate
})(RegisterForm)

class RegisterFormComponent extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(formData) {
    debugger
    console.log(formData)
  }
  render() {
    return (
      <RegisterForm handleSubmit={this.handleSubmit}></RegisterForm>
      // <form onSubmit={ this.handleSubmit }>
      //   <Field name="username" component="input" />
      //   <button type="submit">Submit</button>
      // </form>
    )
  }
}


export default RegisterFormComponent