import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { localSignIn } from '../../../Redux/authentication'
import store from '../../../Redux/store'

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
const SigninForm = props => {
  const { handleSubmit, reset } = props
  const signInHandler = function (formData) {
    console.log(formData)
    debugger
  }
  return (
    <form onSubmit={handleSubmit(signInHandler)}>
      <Field name="username" label="username" type="text" component={renderField} />
    </form>
  )
}

/* export a redux-form HOC
*
*/
export default reduxForm({
  form: 'signin'
})(SigninForm)