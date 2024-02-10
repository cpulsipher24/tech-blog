// controllers/authController.js

const { User } = require('../models');

const authController = {
  // Sign up controller method
  signup: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // Check if the username or email already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Create a new user
      const newUser = await User.create({ username, email, password });
      req.session.user = newUser; // Set user session
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Log in controller method
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      // Find user by username
      const user = await User.findOne({ where: { username } });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Set user session
      req.session.user = user;
      res.status(200).json(user);
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Log out controller method
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.clearCookie('connect.sid'); // Clear session cookie
      res.status(200).json({ message: 'Logged out successfully' });
    });
  }
};

module.exports = authController;
