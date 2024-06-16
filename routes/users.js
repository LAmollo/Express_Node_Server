const express = require('express');
const router = express.Router();
const { users } = require('../data');

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({ success: true, user: newUser });
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  users = users.map(user => user.id === id ? { ...user, ...updatedData } : user);
  res.json({ success: true, users });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  users = users.filter(user => user.id !== id);
  res.json({ success: true, users });
});

module.exports = router;
