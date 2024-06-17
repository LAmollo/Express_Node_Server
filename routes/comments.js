const express = require('express');
const router = express.Router();
const { comments } = require('../data');

router.get('/', (req, res) => {
  const { postId } = req.query;
  const filteredComments = postId ? comments.filter(c => c.postId === parseInt(postId)) : comments;
  res.json(filteredComments);
});

router.post('/', (req, res) => {
  const comment = {
    id: comments.length + 1,
    postId: parseInt(req.body.postId),
    content: req.body.content
  };
  comments.push(comment);
  res.redirect('/');
});

module.exports = router;

