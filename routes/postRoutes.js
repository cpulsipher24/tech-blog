// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Define routes for posts
router.get('/posts', dashboardController.getAllPosts);
router.get('/posts/:id', dashboardController.getPostById);
router.post('/posts', dashboardController.createPost);
router.put('/posts/:id', dashboardController.updatePost);
router.delete('/posts/:id', dashboardController.deletePost);
router.post('/posts/:id/comments', dashboardController.createComment);

module.exports = router;
