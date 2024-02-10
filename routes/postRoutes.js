const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { requireAuth } = require('../middleware/authMiddleware');

// Route to get all blog posts
router.get('/', postController.getAllPosts);

// Route to display individual blog post
router.get('/:id', postController.getPostWithComments);

// Route to create a new blog post
router.post('/', requireAuth, postController.createPost);

// Route to update an existing blog post
router.put('/:id', requireAuth, postController.updatePost);

// Route to delete a blog post
router.delete('/:id', requireAuth, postController.deletePost);

// Route to create a new comment on a blog post
router.post('/:id/comments', requireAuth, postController.createComment);

module.exports = router;