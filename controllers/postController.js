// controllers/postController.js
const { Post, Comment, User } = require('../models');

const postController = {
  // Controller function to get all blog posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Controller function to create a new blog post
  createPost: async (req, res) => {
    try {
      // Implement logic to create a new post
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Controller function to update an existing blog post
  updatePost: async (req, res) => {
    try {
      // Implement logic to update a post
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Controller function to delete a blog post
  deletePost: async (req, res) => {
    try {
      // Implement logic to delete a post
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Controller function to create a new comment on a blog post
  createComment: async (req, res) => {
    try {
      // Implement logic to create a new comment
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Controller function to display an individual blog post and its comments
  getPostWithComments: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId, {
        include: [{ model: Comment, include: User }] // Include comments with their associated users
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post with comments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = postController;
