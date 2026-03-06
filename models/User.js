const mongoose = require('mongoose');

// Define the User schema - this describes what a user document looks like in MongoDB
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Each user must have a unique email
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true  // Each username must be unique too
  },
  password: {
    type: String,
    required: true
    // Plain text password (not hashed for this toy project)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
