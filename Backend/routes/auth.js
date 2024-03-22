// taskRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');

// Create user
router.post("/register", authController.register )
router.post('/login-user', authController.login);

module.exports = router;
