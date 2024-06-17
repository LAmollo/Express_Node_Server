const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

// Sample data
let users = [];
let posts = [];
let comments = [];

// Middleware setup
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  console.log('Received POST request to /new');
  console.log('Request body:', req.body);
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post);
  console.log('New post added:', post);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render('edit', { post });
});

app.put('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect('/');
});

app.delete('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

app.get('/users', (req, res) => {
  res.render('users', { users });
});

app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  res.redirect('/users');
});

app.get('/comments', (req, res) => {
  const { postId } = req.query;
  const filteredComments = postId ? comments.filter(c => c.postId === parseInt(postId)) : comments;
  res.json(filteredComments);
});

app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    postId: parseInt(req.body.postId),
    content: req.body.content
  };
  comments.push(comment);
  res.redirect('/');
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
