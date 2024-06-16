const express = require('express');
const router = express.Router();
const { posts } = require('../data');

router.get('/', (req, res) => {
  if (req.query.userId) {
    const filteredPosts = posts.filter(post => post.userId === req.query.userId);
    return res.json(filteredPosts);
  }
  res.json(posts);
});

router.post('/', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.json({ success: true, post: newPost });
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
