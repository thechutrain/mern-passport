/* userOnly()
* - is a higher order component that is intended to wrap other components
* and will only display when the redux store of logged in is true
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

function userOnly(WrappedComponent, displayError = false) {
  // connect to the redux store - loggedIn 
  const mapStateToProps = (store) => {
    return {
      loggedIn: store.authenticate.loggedIn,
      user: store.authenticate.user
    }
  }

  class userOnlyWrapper extends Component {
    render() {
      const noUserDisplay = displayError ? <p>You must be logged in to view this component </p> : null
      return this.props.loggedIn ? <WrappedComponent {...this.props} /> : noUserDisplay
    }
  }
  // return HOC
  return connect(mapStateToProps)(userOnlyWrapper)
}

export default userOnly