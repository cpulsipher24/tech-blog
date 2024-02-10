// middleware/sessionTimeout.js

const sessionTimeout = (timeout) => {
    return (req, res, next) => {
      if (req.session && req.session.user) {
        req.session.lastActive = Date.now();
      }
      next();
    };
  };
  
  module.exports = sessionTimeout;
  