/* withLoading()
* - is a higher order component that is intended to wrap other components
* - in order to fix the delayed state update after a component mounts & has an
* - an intitial state that does not reflect the soon to be state
*/
import React, { Component } from 'react'
import spinner from './spinner.gif'

function withLoading(WrappedComponent, displayLoadingFlag = false) {
	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {
				displayLoading: displayLoadingFlag
			}
		}
		render() {
			if (this.props.isLoading && this.state.displayLoading) {
				return (
					<div>
						<img src={spinner} alt="loading spinner" />
					</div>
				)
			} else if (this.props.isLoading && !this.state.displayLoading) {
				return null
			} else {
				return <WrappedComponent {...this.props} />
			}
		}
	}
}

export default withLoading
