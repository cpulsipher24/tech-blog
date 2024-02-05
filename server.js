// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const sessionStore = new SequelizeStore({ db: sequelize });

const routes = require('./routes'); // This will automatically look for an index.js inside /routes

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use('/', routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
