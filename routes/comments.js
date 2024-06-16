const express = require('express');
const router = express.Router();
const { comments } = require('../data');

router.get('/', (req, res) => {
  if (req.query.postId) {
    const filteredComments = comments.filter(comment => comment.postId === req.query.postId);
    return res.json(filteredComments);
  }
  res.json(comments);
});

router.post('/', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.json({ success: true, comment: newComment });
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  comments = comments.map(comment => comment.id === id ? { ...comment, ...updatedData } : comment);
  res.json({ success: true, comments });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  comments = comments.filter(comment => comment.id !== id);
  res.json({ success: true, comments });
});

module.exports = router;
