// controllers/dashboardController.js
const { Post, Comment, User } = require('../models');

const dashboardController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }, { model: Comment, include: [User] }],
      });

      res.render('home', { posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['username'] }, { model: Comment, include: [User] }],
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.render('post', { post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createPost: async (req, res) => {
    const { title, content } = req.body;

    try {
      const user = req.user;

      const newPost = await Post.create({
        title,
        content,
        user_id: user.id,
      });

      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updatePost: async (req, res) => {
    const { title, content } = req.body;

    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await post.update({
        title,
        content,
      });

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await post.destroy();

      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createComment: async (req, res) => {
    const { content } = req.body;

    try {
      const user = req.user;

      const newComment = await Comment.create({
        content,
        user_id: user.id,
        post_id: req.params.id,
      });

      res.json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = dashboardController;
