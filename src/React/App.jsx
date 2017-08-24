import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SecretData from './SecretData'

class App extends Component {
  // constructor() {
  //   super()
  // }
  render() {
    return (
      <div id="App">
        <h1>Hello world</h1>
        <br />
        <SecretData></SecretData>
      </div>
    )
  }
}

/*  ===== PropTypes  =========
* 
*/
// React compnents have a property of propTypes (lower case p!)
App.propTypes = {
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  flashMsg: PropTypes.object.isRequired,
}

/*  ===== connect to redux store  =========
* - mapStateToProps function passes redux store as a prop into app component
*/
const mapStateToProps = function(store) {
  return {
    user: store.authenticate.user,
    loggedIn: store.authenticate.loggedIn,
    flashMsg: store.authenticate.flashMsg
  }
}

export default connect(mapStateToProps)(App)