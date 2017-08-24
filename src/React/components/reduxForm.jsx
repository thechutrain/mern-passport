import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

let SubscribeForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      {/* form body here */}
      <div>
        <label htmlFor="email">Email: </label>
        <Field name="email" component="input" type="text"></Field>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

// SubscribeForm = reduxForm({
//   form: 'subscribe'
// })(SubscribeForm)

const createReduxForm = reduxForm({ form: 'subscribe' })
SubscribeForm = createReduxForm(SubscribeForm)

class SubscribeFormComponent extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(formData){
    console.log(formData)
    // alert(formData)
  }
  render() {
    return <SubscribeForm onSubmit={this.handleSubmit}/>
  }
}

// export default SubscribeForm
export default SubscribeFormComponent