import React, { Component } from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import './registerForm.css'
import store from '../../Redux/store'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div>
      <label htmlFor={label}>{label}:</label>
      <div className="input-wrapper">
        <input type={type} {...input} />
        {
          touched && ((error && <span className="errMsgSpan">*{error}</span>))
        }
      </div>
    </div>
  )
}

let RegisterForm = props => {
  const { handleSubmit, myHandleSubmit, reset } = props
  const submissionHandler = function(formData) {
    console.log(formData)
    debugger
    reset()
  }
  // <form className="register-form" onSubmit={handleSubmit(function(formData) {
  //   myHandleSubmit(formData, reset)})
  // }>
  return (
    <form className="register-form" onSubmit={handleSubmit(submissionHandler)}>
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
    errors.confirmPassword = 'Confirm Password Required'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
    // errors.password = 'Passwords must match'
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
  // this function gets called by redux-form, props will be inject 
  // into it. Helper methods for clearing the form
  myHandleSubmit(formData, reset) {
    console.log(formData)
    console.log(reset)
    
    // const { createRecord, reset } = this.props
    // redux action creator to submit form
    // redux action creator to clear form
    debugger
    reset()
    // return createRecord(formData).then(() => {
    //   console.log('record created yo')
    //   reset()
    // })
    // store.dispatch(reset('register'))
  }
  render() {
    // <RegisterForm handleSubmit={this.handleSubmit} />
    return (
      <RegisterForm myHandleSubmit={this.myHandleSubmit} />
    )
  }
}