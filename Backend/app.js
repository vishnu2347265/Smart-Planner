const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');

const mongoUrl = "mongodb+srv://admin:admin@cluster0.njeb9m7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log(e);
    });

require('./model/UserDetails')
const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
    res.send({ status: "Started" })
})

app.use('/task', taskRoutes);
app.use('/auth', authRoutes);

app.post('/add-new-task/:userId', async (req, res) => {
    try {
        const { taskData } = req.body;
        const userId = req.params.userId;

        // Create a new task document
        const newTask = new Task({
            taskName: taskData.taskName,
            taskDescription: taskData.taskDescription,
            taskCategory: taskData.taskCategory,
            startDate: null,
            endDate: null,
            taskStatus: taskData.taskStatus,
            duration: null
        });

        // Find the user by ID and push the new task ID into the tasks array
        const updatedUser = await Project.findByIdAndUpdate(
            userId,
            { $push: { tasks: newTask._id } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(201).json({ message: "Task added successfully", newTask });
    } catch (error) {
        console.error("Error adding new task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Edit task route
app.put('/edit-task/:taskId', async (req, res) => {
    const { taskData } = req.body;
    const taskId = req.params.taskId;

    try {
        // Assuming 'Task' is the Mongoose model for your task collection
        const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete task route
app.delete('/delete-task/:userId/:taskId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const taskId = req.params.taskId;

        // Remove the task from the user's tasks array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { tasks: taskId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the task document
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put('/set-start-time/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Get the current date/time
        const currentTime = new Date();

        // Update the task's startDate to the current time
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { startDate: currentTime },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Start time updated successfully", updatedTask });
    } catch (error) {
        console.error("Error setting start time:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put('/set-end-time/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Get the current date/time
        const currentTime = new Date();

        // Update the task's endDate to the current time
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { endDate: currentTime },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Calculate the duration
        const startTime = new Date(updatedTask.startDate);
        const endTime = new Date(currentTime);
        const duration = Math.abs(endTime - startTime) / (1000 * 60); // Duration in minutes

        // Update the duration property of the task
        updatedTask.duration = duration;

        // Save the updated task
        await updatedTask.save();

        res.json({ message: "End time set and duration calculated successfully", updatedTask });
    } catch (error) {
        console.error("Error setting end time and calculating duration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.listen(5001, () => {
    console.log("Node js Server Started");
})