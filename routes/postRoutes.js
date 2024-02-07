// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to get all blog posts
router.get('/posts', postController.getAllPosts);

// Route to display individual blog post
router.get('/posts/:id', postController.getPostById);

// Route to create a new blog post
router.post('/posts', postController.createPost);

// Route to update an existing blog post
router.put('/posts/:id', postController.updatePost);

// Route to delete a blog post
router.delete('/posts/:id', postController.deletePost);

// Route to create a new comment on a blog post
router.post('/posts/:id/comments', postController.createComment);

module.exports = router;
