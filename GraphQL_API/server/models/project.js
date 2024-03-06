const mongoose = require('mongoose');


// create schema for project model
const projectSchema = mongoose.Schema({
	title: String,
	weight: Number,
	description: String,
});

// export based on projectSchema
module.exports = mongoose.model('Project', projectSchema);
