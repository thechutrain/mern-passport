const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	this.password = this.hashPassword(this.password)
	next()
})

// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User
