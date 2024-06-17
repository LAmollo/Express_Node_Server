const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const PORT = 3000;

// Import routes
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// Data
app.locals.posts = require('./data').posts;
app.locals.users = require('./data').users;
app.locals.comments = require('./data').comments;

// Routes
app.use('/', indexRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);

// Custom middleware for simple authentication
const simpleAuth = (req, res, next) => {
  const { auth } = req.query;
  if (auth === 'true') {
    next();
  } else {
    res.status(403).send('Forbidden: Authentication required');
  }
};

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
