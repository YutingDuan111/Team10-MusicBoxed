const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/signup - Create a new user
router.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if all fields are provided
    if (!email || !username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email, username, and password' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email or username already exists' 
      });
    }

    // Create new user
    const newUser = new User({
      email,
      username,
      password
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during signup' 
    });
  }
});

// POST /api/auth/login - Authenticate a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Compare passwords (plain text comparison)
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

module.exports = router;
