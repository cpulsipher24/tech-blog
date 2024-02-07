// controllers/postController.js
const { Post, Comment, User } = require('../models');

const postController = {
  // Other controller functions...

  // Controller function to display an individual blog post and its comments
  getPostWithComments: async (req, res) => {
    try {
      // Fetch the post details along with its associated comments
      const postId = req.params.id;
      const post = await Post.findByPk(postId, {
        include: [
          { model: User, attributes: ['username'] }, // Include the User model to fetch post creator's username
          { model: Comment, include: [User] } // Include the Comment model and nested User model to fetch associated comments and comment creator's username
        ]
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Render the post.handlebars template and pass the post and comments data to it
      res.render('post', { post });
    } catch (error) {
      console.error('Error fetching post with comments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = postController;
