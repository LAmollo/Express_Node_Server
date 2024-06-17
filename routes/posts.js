const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { posts } = require('../data');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  if (req.query.userId) {
    const filteredPosts = posts.filter(post => post.userId === req.query.userId);
    return res.json(filteredPosts);
  }
  res.json(posts);
});

router.post('/', upload.single('image'), (req, res) => {
  const newPost = req.body;
  if (req.file) {
    newPost.image = req.file.filename;
  }
  newPost.id = Date.now().toString();
  posts.push(newPost);
  res.redirect('/');
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  posts = posts.map(post => post.id === id ? { ...post, ...updatedData } : post);
  res.json({ success: true, posts });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  posts = posts.filter(post => post.id !== id);
  res.json({ success: true, posts });
});

module.exports = router;
