const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	departmentId: String,
	slack: String,
	reports: Number
})

module.exports = mongoose.model('user', userSchema);