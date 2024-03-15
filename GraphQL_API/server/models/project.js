/**
 * Defines the Project schema for MongoDB.
 *
 * The projectSchema represents a project entity with fields:
 * - title: The name of the project (String)
 * - weight: The priority of the project (Number)
 * - description: A description of the project (String)
 * - projectId: The ID of the project (String)
 */
// task 6 - setting up the task model

// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String,
});

module.exports = mongoose.model("Project", projectSchema);
