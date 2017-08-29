import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './registerForm.css'
import { localSignUp } from '../../../Redux/authentication'
import store from '../../../Redux'

/* renderField is a functional component, that renders an input in a 
* redux-form
*
*/
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div>
      <label htmlFor={label}>{label}:</label>
      <div className="input-wrapper">
        <input type={type} {...input} />
        {
          touched && ((error && <span>*{error}</span>))
        }
      </div>
    </div>
  )
}

/* template to my form before its wrapped in a redux-form HOC
*
*/
const RegisterForm = props => {
  const { handleSubmit, reset } = props // handleSubmit is injected by redux-form
  const submissionHandler = function (formData) {
    console.log(formData)
    debugger
    store.dispatch(localSignUp(formData.username, formData.password))
    reset()
  }
  return (
    <form className="register-form" onSubmit={handleSubmit(submissionHandler)}>
      <h2>Register!</h2>
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
  }
  // else if (values.username.length < 3) {
  //   errors.username = 'Username must be at least 3 characters'
  // }
  // validate password
  if (!values.password) {
    errors.password = 'Password Required'
  }
  //  else if (values.password.length < 6) {
  //   errors.password = 'Password much be at least 6 characters long'
  // } else if (!values.password.match(/\d/)) {
  //   errors.password = 'Password must contain a number'
  // }
  // confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password Required'
  }
  //  else if (values.password !== values.confirmPassword) {
  //   errors.confirmPassword = 'Passwords must match'
  //   // errors.password = 'Passwords must match'
  // }
  return errors
}

export default reduxForm({
  form: 'register',
  validate: validator
})(RegisterForm)
