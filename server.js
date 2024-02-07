// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const postRoutes = require('./routes/postRoutes'); // Import the post routes file

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up Handlebars.js engine with custom helpers
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up sessions
app.use(session({
  secret: 'super_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Use the post routes file
app.use('/api', postRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
