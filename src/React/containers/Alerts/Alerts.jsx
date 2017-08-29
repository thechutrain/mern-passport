import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './Alerts.css'
import deleteIcon from './delete.svg'
import { clearMsg, updateMsg } from '../../../Redux/alerts'

class Alerts extends Component {
  render() {
    // is displayMsg is false, return nothing
    if (!this.props.displayMsg) return null
    // get the CSS classes
    const classList = ['AlertContainer']
    if (this.props.error){ classList.push('error')}
    if (this.props.success){ classList.push('success')}
    if (this.props.displayMsg){ classList.push('display')}
    // return 
    return (
      <div className={classList.join(' ')}>
        <div className="text-wrapper">
          <p>{this.props.msg}</p>
        </div>
        <div className="icon-wrapper" onClick={ this.props.clearMsg }>
          <img id="alert-delete-icon" src={deleteIcon} alt="delete icon" />
        </div>
    </div>)
  }
}

Alerts.propTypes = {
  msg: PropTypes.string.isRequired,
  displayMsg: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  clearMsg: PropTypes.func.isRequired
}

// Redux Store
const mapStateToProps = (store) => {
  const { error, success, displayMsg, msg } = store.alerts
  return { error, success, displayMsg, msg }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    clearMsg: () => { dispatch(clearMsg()) },
    // updateMsg: (msg, secondDelay) => { dispatch(updateMsg(msg, {}, secondDelay)) }
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Alerts)