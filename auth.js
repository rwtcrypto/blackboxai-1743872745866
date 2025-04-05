// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Mock user database
const mockUsers = [
    {
        email: 'user@example.com',
        password: 'password123',
        username: 'videocreator123',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    }
];

// Initialize auth module
function initAuth() {
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate inputs
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    // Check credentials against mock database
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Create user session
        createUserSession(user);
        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
}

// Create user session
function createUserSession(user) {
    const sessionUser = {
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        loggedInAt: new Date().toISOString()
    };
    
    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(sessionUser));
}

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuth);

// Make auth functions available globally
window.auth = {
    isAuthenticated,
    getCurrentUser,
    logout
};