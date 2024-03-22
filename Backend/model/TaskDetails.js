
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    taskCategory: String,
    startDate: Date,
    endDate: Date,
    taskStatus: String,
    duration: Number
  
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;