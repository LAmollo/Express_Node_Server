const express = require('express');
const router = express.Router();
const { users } = require('../data');

router.get('/', (req, res) => {
  res.render('users', { title: 'Manage Users', users });
});

router.post('/', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  res.redirect('/users');
});

module.exports = router;
