// taskController.js
const Task = require('../model/task.model');

exports.createTask = async (req, res) => {
    const { categoryName, taskName, description, startDate, endDate, startTime, endTime } = req.body;
    try {
        const task = await Task.create({
            categoryName,
            taskName,
            description,
            startDate,
            endDate,
            startTime,
            endTime
        });
        res.send({ status: "ok", data: "task created" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
};


