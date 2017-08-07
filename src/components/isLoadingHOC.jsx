import React, { Component } from 'react'

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
				return <div>is loading .... pls wait</div>
			} else if (this.props.isLoading && !this.state.displayLoading) {
				return null
			} else {
				return <WrappedComponent {...this.props} />
			}
		}
	}
}

export default withLoading
