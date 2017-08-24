/* userOnly()
* - is a higher order component that is intended to wrap other components
* and will only display when the redux store of logged in is true
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

function userOnly(WrappedComponent) {
  // connect to the redux store - loggedIn 
  const mapStateToProps = (store) => {
    return {
      loggedIn: store.authenticate.loggedIn
    }
  }

  class userOnlyWrapper extends Component {
    // constructor(props) {
    //   super(props)
    //   this.state = {
    //     loggedIn: props.loggedIn,
    //     test: 'this is a test'
    //   }
    // }
    render() {
      return this.props.loggedIn ? <WrappedComponent {...this.props} /> : null
    }
  }
  // return HOC
  return connect(mapStateToProps)(userOnlyWrapper)
}

export default userOnly
// export default connect(mapStateToProps)(userOnly)