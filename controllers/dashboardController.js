// controllers/dashboardController.js
const { Post, Comment, User } = require('../models');

const dashboardController = {
  getDashboard: async (req, res) => {
    try {
      // Fetch data needed for the dashboard
      const posts = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }, { model: Comment, include: [User] }],
      });

      // Render the dashboard view with the fetched data
      res.render('dashboard', { posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Add more actions for the dashboard if needed

};

module.exports = dashboardController;
