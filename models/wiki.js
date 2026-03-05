const mongoose = require('mongoose');

const wikiSchema = new mongoose.Schema({
  urlName: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  content: String,
  viewCount: {
    type: Number,
    default: 0
  },
  managePassword: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wiki', wikiSchema);
