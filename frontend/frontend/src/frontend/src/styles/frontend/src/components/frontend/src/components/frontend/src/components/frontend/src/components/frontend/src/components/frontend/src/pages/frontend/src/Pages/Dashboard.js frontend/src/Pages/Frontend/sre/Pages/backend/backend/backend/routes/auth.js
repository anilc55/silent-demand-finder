const express = require('express');
const router = express.Router();

// Mock user database
const users = [];

// Register route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In real app, hash this password
    createdAt: new Date()
  };
  
  users.push(newUser);
  
  res.json({
    message: 'Registration successful',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    },
    token: 'mock-jwt-token-' + newUser.id
  });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token: 'mock-jwt-token-' + user.id
  });
});

module.exports = router;
