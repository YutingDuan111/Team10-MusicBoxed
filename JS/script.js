// API Base URL - Change this when you deploy to Render
// For local testing, use: http://localhost:3000
// For production, use: https://your-render-app.onrender.com
const API_BASE_URL = 'http://localhost:3000';

// Switch between Login and Signup tabs
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const tabButtons = document.querySelectorAll('.tab-button');

  // Hide all forms
  loginForm.classList.remove('active');
  signupForm.classList.remove('active');

  // Remove active class from all buttons
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Show selected form and mark button as active
  if (tab === 'login') {
    loginForm.classList.add('active');
    tabButtons[0].classList.add('active');
  } else {
    signupForm.classList.add('active');
    tabButtons[1].classList.add('active');
  }
}

// Handle Login
async function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const messageEl = document.getElementById('loginMessage');

  // Clear previous message
  messageEl.textContent = '';
  messageEl.className = 'message';

  // Validate inputs
  if (!email || !password) {
    messageEl.textContent = 'Please fill in all fields';
    messageEl.className = 'message error';
    return;
  }

  try {
    // Make API call to your backend
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      messageEl.textContent = '✓ Login successful! Redirecting...';
      messageEl.className = 'message success';

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('loggedIn', 'true');

      // Redirect to home page after 1 second
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      messageEl.textContent = data.message || 'Login failed';
      messageEl.className = 'message error';
    }
  } catch (error) {
    console.error('Login error:', error);
    messageEl.textContent = 'Error connecting to server. Make sure the backend is running.';
    messageEl.className = 'message error';
  }
}

// Handle Signup
async function handleSignup() {
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const messageEl = document.getElementById('signupMessage');

  // Clear previous message
  messageEl.textContent = '';
  messageEl.className = 'message';

  // Validate inputs
  if (!username || !email || !password) {
    messageEl.textContent = 'Please fill in all fields';
    messageEl.className = 'message error';
    return;
  }

  // Basic email validation
  if (!email.includes('@')) {
    messageEl.textContent = 'Please enter a valid email';
    messageEl.className = 'message error';
    return;
  }

  try {
    // Make API call to your backend
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (data.success) {
      messageEl.textContent = '✓ Account created! Switching to login...';
      messageEl.className = 'message success';

      // Clear the signup form
      document.getElementById('signupUsername').value = '';
      document.getElementById('signupEmail').value = '';
      document.getElementById('signupPassword').value = '';

      // Switch to login tab after 1 second
      setTimeout(() => {
        switchTab('login');
        document.getElementById('loginEmail').value = email;
      }, 1000);
    } else {
      messageEl.textContent = data.message || 'Sign up failed';
      messageEl.className = 'message error';
    }
  } catch (error) {
    console.error('Signup error:', error);
    messageEl.textContent = 'Error connecting to server. Make sure the backend is running.';
    messageEl.className = 'message error';
  }
}

// Check if user is logged in when page loads
function checkLogin() {
  const loggedIn = localStorage.getItem('loggedIn');
  const user = localStorage.getItem('user');

  if (loggedIn === 'true' && user) {
    const userData = JSON.parse(user);
    console.log('User logged in:', userData.username);
  }
}

// Run check when page loads
document.addEventListener('DOMContentLoaded', checkLogin);
