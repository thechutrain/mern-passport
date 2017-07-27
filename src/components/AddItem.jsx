import React, { Component } from 'react'
// import axios from 'axios'

class AddItemForm extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			found: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(event) {
		event.preventDefault()
		// console.log(event.target.type)
		if (event.target.type === 'text') {
			// console.log('text type')
			this.setState({
				name: event.target.value
			})
		} else if (event.target.type === 'checkbox') {
			console.log('checkbox type')
			console.log(event.target.checked)
			this.setState({
				found: !this.state.found
			})
		}
	}
	handleSubmit(event) {
		event.preventDefault()
		console.log('handlesubmit called')
		// console.log(this.state)
		// axios
		// 	.post('/api/new/lostitem', {
		// 		name: this.state.name,
		// 		found: this.state.found
		// 	})
		// 	.then(response => {
		// 		console.log(response.data)
		// 		this.props._alertMe()
		//
		// 		this.setState({
		// 			name: '',
		// 			found: false
		// 		})
		// 	})
		this.props.makeNewItem(this.state.name, this.state.found)
		this.setState({
			name: '',
			found: false
		})
	}
	render() {
		return (
			<form>
				<label htmlFor="name">name:</label>
				<input
					type="text"
					value={this.state.name}
					onChange={this.handleChange}
				/>
				<label htmlFor="name">Found?</label>
				<input
					type="checkbox"
					defaultChecked={this.state.found}
					onChange={this.handleChange}
				/>
				<button type="submit" onClick={this.handleSubmit}>
					Submit
				</button>
			</form>
		)
	}
}

export default AddItemForm
