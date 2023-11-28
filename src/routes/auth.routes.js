// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/Auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

module.exports = router;
