// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Routes for blog functionality
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);
router.post('/posts/:id/comments', postController.createComment);

module.exports = router;
