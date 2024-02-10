// server.js

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
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
  saveUninitialized: true
}));

// Use routes
app.use('/api', postRoutes);
app.use('/auth', authRoutes);

// Define routes

// Route for the root URL
app.get('/', (req, res) => {
  // You can render a homepage or redirect to another page here
  res.send('Welcome to my app!');
});

// Dashboard route - Display existing blog posts and options to add, update, or delete
app.get('/dashboard', requireAuth, (req, res) => {
  // Fetch and display existing blog posts for the current user
  const userId = req.session.userId; // Assuming userId is stored in session after login
  // Fetch blog posts from database based on userId
  
  // Render the dashboard page with fetched blog posts
  res.render('dashboard', { posts: fetchedPosts });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
