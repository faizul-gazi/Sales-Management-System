// Handle form toggling
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

// Handle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Basic validation
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }

    // Here you would typically send the login request to your server
    // For demo purposes, we'll simulate a successful login
    const userData = {
        email: email,
        name: 'Demo User',
        // Add other user data as needed
    };

    if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
    }

    showToast('Login successful!');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);

    return false;
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const phone = document.getElementById('registerPhone').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('termsAccept').checked;

    // Basic validation
    if (!name || !phone || !email || !password || !confirmPassword) {
        showToast('Please fill in all required fields', 'error');
        return false;
    }

    // Phone number validation (Bangladesh format)
    const phoneRegex = /^(\+880|0)(1[3-9]\d{8})$/;
    if (!phoneRegex.test(phone)) {
        showToast('Please enter a valid Bangladesh phone number', 'error');
        return false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }

    // Password validation
    if (password.length < 6) {
        showToast('Password must be at least 6 characters long', 'error');
        return false;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return false;
    }

    if (!termsAccepted) {
        showToast('Please accept the Terms & Conditions', 'error');
        return false;
    }

    // Here you would typically send the registration request to your server
    // For demo purposes, we'll simulate a successful registration
    const userData = {
        name: name,
        email: email,
        phone: phone
        // Add other user data as needed
    };

    localStorage.setItem('user', JSON.stringify(userData));
    showToast('Registration successful!');
    
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);

    return false;
}

// Check if user is already logged in
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        // Update UI for logged-in user
        document.querySelector('.account-container').innerHTML = `
            <div class="form-container">
                <h2>Welcome, ${user.name}!</h2>
                <div class="user-info">
                    <p><strong>Email:</strong> ${user.email}</p>
                    ${user.phone ? `<p><strong>Phone:</strong> ${user.phone}</p>` : ''}
                </div>
                <button onclick="handleLogout()" class="submit-btn">Logout</button>
            </div>
        `;
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    showToast('Logged out successfully');
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', checkLoginStatus); 