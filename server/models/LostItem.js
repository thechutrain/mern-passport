const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LostItemSchema = new Schema({
	name: {
		type: String
	},
	found: {
		type: Boolean
	}
})

const LostItem = mongoose.model('LostItem', LostItemSchema)

module.exports = LostItem
