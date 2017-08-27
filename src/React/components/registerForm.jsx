import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type={type} {...input} />
      {
        touched && ((error && <span className="errMsgSpan">{error}</span>))
      }
    </div>
  )
}

let RegisterForm = props => {
  const { handleSubmit, myHandleSubmit } = props
  return (
    <form onSubmit={handleSubmit(myHandleSubmit)}>
      <Field name="username" label="username" type="text" component={renderField} />
      <Field name="password" label="password" type="password" component={renderField} />
      <Field name="confirmPassword" label="confirm password" type="password" component={renderField} />
      <button type="submit">Register</button>
    </form>
  )
}
const validator = values => {
  const errors = {}
  // validate username
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length < 3) {
    errors.username = 'Username must be at least 3 characters'
  }
  // validate password
  if (!values.password) {
    errors.password = 'Password Required'
  } else if (values.password.length < 6) {
    errors.password = 'Password much be at least 6 characters long'
  } else if (!values.password.match(/\d/)) {
    errors.password = 'Password must contain a number'
  }
  // confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Password Required'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
    errors.password = 'Passwords must match'
  }
  return errors
}

RegisterForm = reduxForm({
  form: 'register',
  validate: validator
})(RegisterForm)
// ======================================================


// Component that wraps the Register form
export default class RegisterComponent extends Component {
  constructor() {
    super()
    this.myHandleSubmit = this.myHandleSubmit.bind(this)
  }
  myHandleSubmit(formData) {
    console.log(formData)
  }
  render() {
    // <RegisterForm handleSubmit={this.handleSubmit} />
    return (
      <RegisterForm myHandleSubmit={this.myHandleSubmit} />
    )
  }
}