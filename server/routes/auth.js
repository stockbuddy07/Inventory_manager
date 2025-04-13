const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) res.json({ success: true });
  else res.status(401).json({ success: false });
});

// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  try {
    await User.create({ username, password });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

module.exports = router;
