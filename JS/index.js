const header = document.querySelector('.header');
const slides = document.querySelectorAll('.slide');
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const wikiRoutes = require("../ROUTES/wiki.js");
const authRoutes = require("../ROUTES/auth.js");

let currentIndex = 0; 
let autoSlideInterval;

// Middleware
app.use(cors());  // Enable CORS for all routes (allows GitHub Pages to call this backend)
app.use(express.json({limit: '5mb'}));
app.use(express.static("./public"));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("MongoDB connection error:", err));




function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0; 
    } 
    else if (index < 0) {
        currentIndex = slides.length - 1; 
    } 
    else {
        currentIndex = index; 
    }
    header.style.transform = `translateX(-${currentIndex * 100}%)`; 
}


function nextSlide(){
    showSlide(currentIndex + 1)
}

function autoSlide(){
    autoSlideInterval = setInterval(nextSlide, 10000);
}


window.addEventListener("load", (event) => {
    autoSlide();
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wiki", wikiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}.`));
