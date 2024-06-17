const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Home', posts: req.app.locals.posts });
});

module.exports = router;
