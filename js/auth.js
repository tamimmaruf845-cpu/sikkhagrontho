// ========================================
// AUTHENTICATION & SESSION MANAGEMENT
// ========================================

// Get current logged-in user
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Check if current user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    if (!email || !password) {
        errorEl.textContent = 'Please fill in all fields';
        return;
    }

    const data = getData();
    const user = data.users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store current user in session
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Redirect based on role
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    } else {
        errorEl.textContent = 'Invalid email or password';
    }
}

// Logout Handler
function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Registration Handler
function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const errorEl = document.getElementById('register-error');

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        errorEl.textContent = 'Please fill in all fields';
        return;
    }

    if (password !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match';
        return;
    }

    if (password.length < 3) {
        errorEl.textContent = 'Password must be at least 3 characters';
        return;
    }

    const data = getData();

    // Check if email already exists
    if (data.users.find(u => u.email === email)) {
        errorEl.textContent = 'Email already registered';
        return;
    }

    // Create new user
    const newUser = {
        id: 'u-' + Date.now(),
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: 'student', // Default role
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    data.users.push(newUser);
    saveData(data);

    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alert('Registration successful! Welcome to Sikkhagrontho.');
    window.location.href = 'index.html';
}

// Open Login Modal
function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.classList.add('modal-open');
    }
}

// Close Login Modal
function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        setTimeout(() => modal.classList.add('hidden'), 500);
    }
}

// Open Profile Modal
function openProfileModal() {
    const user = getCurrentUser();
    if (!user) {
        openLoginModal();
        return;
    }

    // Populate profile data
    document.getElementById('profile-avatar').src = user.avatar;
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-role').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    document.getElementById('profile-id').textContent = user.id;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-phone').textContent = user.phone;

    const modal = document.getElementById('profile-modal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.classList.add('modal-open');
    }
}

// Close Profile Modal
function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        setTimeout(() => modal.classList.add('hidden'), 500);
    }
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const input = document.getElementById('login-password');
    const btn = document.querySelector('.password-toggle');
    if (input && btn) {
        if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
        } else {
            input.type = 'password';
            btn.textContent = '👁️';
        }
    }
}

// Protect Admin Pages
function protectAdminPage() {
    if (!isAdmin()) {
        alert('Access Denied! Admin privileges required.');
        window.location.href = 'index.html';
    }
}

// Initialize Auth on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Check if on admin page
    if (window.location.pathname.includes('admin.html')) {
        protectAdminPage();
    }
});
