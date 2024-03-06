const mongoose = require('mongoose');


// create schema for task model
const taskSchema = mongoose.Schema({
	title: String,
	weight: Number,
	description: String,
	projectId: String
});

// export based on taskSchema
module.exports = mongoose.model('Task', taskSchema);
