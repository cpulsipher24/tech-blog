// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign up route
router.post('/signup', authController.signup);

// Log in route
router.post('/login', authController.login);

// Log out route
router.get('/logout', authController.logout);

module.exports = router;
