// middleware/authMiddleware.js

// Authentication middleware function to check if user is authenticated
const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
      // User is authenticated, proceed to the next middleware/route handler
      next();
    } else {
      // User is not authenticated, redirect to login page or send an error response
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = { requireAuth };
  