const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword, // Store the hashed password
      });

      // Respond with the newly created user
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by their email
      const user = await User.findOne({ where: { email } });

      // If user not found or password doesn't match, respond with an error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Set user session or token here

      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    // Clear user session or token here

    res.json({ message: 'Logout successful' });
  },
};

module.exports = authController;
