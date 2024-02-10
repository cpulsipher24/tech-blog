// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to handle user signup
router.post('/signup', authController.signup);

// Route to handle user login
router.post('/login', authController.login);

// Route to handle user logout
router.post('/logout', authController.logout);

module.exports = router;
