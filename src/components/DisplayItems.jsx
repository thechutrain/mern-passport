import React from 'react'

const DisplayItems = props => {
	const allItems = props.lostItems.map(item => {
		return (
			<li key={item._id}>
				{item.name}
			</li>
		)
	})
	return (
		<div className="DisplayItems">
			<h3>Displaying items</h3>
			<ul>
				{allItems}
			</ul>
			{/* {JSON.stringify(props.lostItems)} */}
		</div>
	)
}

export default DisplayItems
