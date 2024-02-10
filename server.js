const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const sessionTimeout = require('./middleware/sessionTimeout');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up sessions
app.use(session({
  secret: 'super_secret_key',
  resave: false,
  saveUninitialized: true,
  // Set session expiration (optional)
  cookie: { maxAge: 3600000 } // 1 hour in milliseconds
}));

// Use session timeout middleware
app.use(sessionTimeout(3600000)); // 1 hour in milliseconds

// Use routes
app.use('/api', postRoutes);
app.use('/auth', authRoutes);

// Define routes

// Route for the root URL
app.get('/', (req, res) => {
  // Render the homepage with navigation links based on authentication status
  const isAuthenticated = req.session && req.session.user;
  res.render('home', { isAuthenticated });
});

// Dashboard route - Display existing blog posts and options to add, update, or delete
app.get('/dashboard', requireAuth, (req, res) => {
  // Placeholder comment: Add logic to fetch existing blog posts for the current user
  const fetchedPosts = []; // Placeholder for fetched posts

  // Render the dashboard page with fetched blog posts
  res.render('dashboard', { posts: fetchedPosts });
});

// Log out route - Clear session
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.redirect('/');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
