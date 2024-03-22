// taskRoutes.js
const express = require('express');
const router = express.Router();

const UserController = require('../controller/userController');

// Create task
router.post('/getUser',UserController.getUser );

module.exports = router;
