// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to display the homepage with existing blog posts
router.get('/', postController.getHomepage);

// Route to get all blog posts
router.get('/posts', postController.getAllPosts);

// Route to display individual blog post
router.get('/posts/:id', postController.getPostWithComments);

// Route to create a new blog post
router.post('/posts', postController.createPost);

// Route to update an existing blog post
router.put('/posts/:id', postController.updatePost);

// Route to delete a blog post
router.delete('/posts/:id', postController.deletePost);

// Route to create a new comment on a blog post
router.post('/posts/:id/comments', postController.createComment);

// Route to display the login page
router.get('/login', postController.getLoginPage);

// Route to display the signup page
router.get('/signup', postController.getSignupPage);

module.exports = router;
