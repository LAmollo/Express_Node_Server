const express = require('express');
const router = express.Router();
const { users, posts, comments } = require('../data');

router.get('/', (req, res) => {
  res.render('index', { users, posts, comments });
});

module.exports = router;