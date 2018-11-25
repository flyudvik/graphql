const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortSchema = new Schema({
	name: String,
	short: Number
})

module.exports = mongoose.model('Short', shortSchema);