// controllers/authController.js

const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
  // User signup
  signup: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
      });
      req.session.user = user;
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  },

  // User login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      req.session.user = user;
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to log in' });
    }
  },

  // User logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Redirect the user to the homepage or any other desired page after logout
        res.redirect('/');
      }
    });
  }
};

module.exports = authController;

