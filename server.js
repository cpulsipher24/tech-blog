// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes'); // Import the index file from routes directory

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ defaultLayout: 'main' }); // Create an instance of handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); // Set handlebars as the view engine

// Set up sessions
app.use(session({
  secret: 'super_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Use the routes defined in the routes directory
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
