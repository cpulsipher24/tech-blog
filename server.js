// server.js
const express = require('express');
const sequelize = require('./config/connection'); // Adjust the path as needed
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dashboardRoutes = require('./routes/dashboardRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Use session middleware

// Use other middleware and configurations

// Use the routes
app.use('/dashboard', dashboardRoutes); // Example prefix for dashboard routes
app.use('/posts', postRoutes); // Example prefix for post-related routes

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
