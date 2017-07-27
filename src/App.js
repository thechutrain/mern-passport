import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import DisplayItems from './components/DisplayItems'
import AddItemForm from './components/AddItem'

class App extends Component {
	constructor() {
		super()
		this.state = {
			lostItems: []
		}
		this._alertMe = this._alertMe.bind(this)
		this.makeNewItem = this.makeNewItem.bind(this)
	}

	componentDidMount() {
		axios.get('/api/lostitem').then(response => {
			console.log(response.data)
			this.setState({
				lostItems: response.data
			})
		})
	}
	// _alertMe = () => {
	// 	alert('I fired')
	// }
	_alertMe() {
		alert('I fired')
	}

	makeNewItem(name, found) {
		axios
			.post('/api/new/lostitem', {
				name: name,
				found: found
			})
			.then(response => {
				console.log(response.data)
				let newLostItems = this.state.lostItems
				newLostItems.push(response.data)
				this.setState({
					lostItems: newLostItems
				})
			})
	}
	render() {
		return (
			<div className="App">
				<h1>This is the APP component</h1>
				{/* <p>
					My lost items: {JSON.stringify(this.state.lostItems)}
				</p> */}
				<DisplayItems lostItems={this.state.lostItems} />
				<AddItemForm _alertMe={this._alertMe} makeNewItem={this.makeNewItem} />
				{/* <DisplayItems lostItems={this.state.lostItems} />
				<AddItemForm /> */}
			</div>
		)
	}
}

export default App
