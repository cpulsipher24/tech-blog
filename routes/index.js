// routes/index.js

const express = require('express');
const router = express.Router();

// Import individual route files
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');

// Use the imported route files
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

module.exports = router;
