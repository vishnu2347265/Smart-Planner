// taskRoutes.js
const express = require('express');
const router = express.Router();

const taskController = require('../controller/taskController');

// Create task
router.post('/createTask', taskController.createTask);

module.exports = router;
