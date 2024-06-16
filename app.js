const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };
  
  const checkApiAccess = (req, res, next) => {
    if (req.url.includes('/api')) {
      console.log('API Access');
    }
    next();
  };
  
  const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  };
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(requestLogger);
  app.use(checkApiAccess);
  app.use(express.static('public'));

// Set EJS as the template engine
  app.set('view engine', 'ejs');

// Routes
  const indexRouter = require('./routes/index');
  const usersRouter = require('./routes/users');
  const postsRouter = require('./routes/posts');
  const commentsRouter = require('./routes/comments');

  app.use('/', indexRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/comments', commentsRouter);

// Error handling middleware
  app.use(errorHandler);

  app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
 });

