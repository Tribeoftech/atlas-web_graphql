/**
 * Task schema definition. Defines the structure of Task documents in MongoDB.
 * Exports a Mongoose model that can be used to interact with Task data.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String,
});

module.exports = mongoose.model("Task", taskSchema);
