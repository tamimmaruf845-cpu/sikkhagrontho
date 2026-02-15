// Theme Logic
function initTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

// Preloader
function handlePreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="infinity-loader">∞</div>
        <style>
        .infinity-loader {
            animation: pulseShine 2s infinite ease-in-out;
            background: linear-gradient(90deg, transparent, #00f5ff, transparent);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent; 
        }
        @keyframes pulseShine {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
        </style>
    `;
    document.body.prepend(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 800);
    });
}

// Navbar
function renderNavbar() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Prevent duplicate navbar
    if (document.querySelector('.navbar')) return;

    const nav = document.createElement('nav');
    nav.className = 'navbar glass';

    let authHTML = '';
    if (currentUser) {
        // Logged In: Show Profile Avatar with Dropdown
        authHTML = `
            <div class="profile-dropdown-container" style="position: relative;">
                <div class="profile-icon" onclick="toggleProfileDropdown(event)" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid var(--primary-color); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                    <img src="${currentUser.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.name)}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div id="profile-dropdown" class="profile-dropdown" style="display: none;">
                    <div class="dropdown-header">
                        <img src="${currentUser.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.name)}" alt="Profile" class="dropdown-avatar">
                        <div class="dropdown-user-info">
                            <div class="dropdown-name">${currentUser.name}</div>
                            <div class="dropdown-email">${currentUser.email}</div>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="javascript:void(0)" onclick="openProfileModal(); closeProfileDropdown();" class="dropdown-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span>My Profile</span>
                    </a>
                    <a href="javascript:void(0)" onclick="handleLogout()" class="dropdown-item logout-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        `;
    } else {
        // Logged Out: Show Login Button
        authHTML = `<button class="nav-btn hero-btn" onclick="openLoginModal()" style="padding: 8px 20px; border-radius: 20px;">Login</button>`;
    }

    // Admin Panel link (only for admins)
    const adminLink = currentUser && currentUser.role === 'admin'
        ? `<a href="admin.html" class="nav-btn" style="border: 1px solid #ff4d4d; color: #ff4d4d;">Admin Panel</a>`
        : '';

    nav.innerHTML = `
        <a href="index.html" class="nav-logo">Sikkhagrontho</a>
        <div class="nav-links" style="display: flex; align-items: center; gap: 20px;">
            <a href="index.html" class="nav-btn">Home</a>
            <a href="explore.html" class="nav-btn">Explore</a>
            <a href="about.html" class="nav-btn">About</a>
            <a href="contact.html" class="nav-btn">Contact</a>
            ${adminLink}
            ${authHTML}
            <button id="theme-toggle-btn" class="nav-btn" onclick="toggleTheme()" style="background:none; border:none; font-size: 1.2rem; cursor: pointer;">☀️</button>
        </div>
    `;

    // Insert after preloader if possible
    document.body.prepend(nav);

    // Highlight active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-btn');
    links.forEach(link => {
        if (link.getAttribute('href') === path && !link.classList.contains('hero-btn')) {
            link.style.color = 'var(--primary-color)';
        }
    });

    // Setup click outside to close dropdown
    if (currentUser) {
        document.addEventListener('click', handleClickOutsideDropdown);
    }

    initTheme();
}

// Toggle Profile Dropdown
function toggleProfileDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';

        // Add animation class
        if (!isVisible) {
            dropdown.classList.add('dropdown-show');
        } else {
            dropdown.classList.remove('dropdown-show');
        }
    }
}

// Close Profile Dropdown
function closeProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
        dropdown.classList.remove('dropdown-show');
    }
}

// Handle Click Outside Dropdown
function handleClickOutsideDropdown(event) {
    const dropdown = document.getElementById('profile-dropdown');
    const profileIcon = document.querySelector('.profile-icon');

    if (dropdown && profileIcon) {
        if (!dropdown.contains(event.target) && !profileIcon.contains(event.target)) {
            closeProfileDropdown();
        }
    }
}

// Footer
function renderFooter() {
    // Only on home page
    if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/' && window.location.pathname !== '') return;

    const footer = document.createElement('footer');
    footer.className = 'footer glass';
    footer.innerHTML = `
        <div class="footer-col">
            <h3>Sikkhagrontho</h3>
            <p>Infinite is strength</p>
            <br>
            <p style="opacity:0.8; font-size: 0.9em;">Founder: Maruf Raihan</p>
        </div>
        <div class="footer-col">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="explore.html">Explore</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h3>Connect</h3>
            <p>Email: sikkhagronthoedu@gmail.com </p>
            <div class="social-links-container">
                <a href="#" class="social-icon" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" class="social-icon" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" class="social-icon" aria-label="X (Twitter)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.867L8.333 4h-4.866zM4 20l6.768-9.986L18 20h-4.333l-5.468-8.2L4 20z" fill="currentColor" stroke="none"/><path d="M4 4l16 16" stroke="none"/></svg>
                    <!-- Using a simpler X shape for stroke consistency -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><path d="M4 4l16 16"/><path d="M20 4L4 20"/></svg> 
                </a>
                <a href="#" class="social-icon" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(footer);
}

// Scroll Handling
function setupScroll() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const nav = document.querySelector('.navbar');
        if (!nav) return;

        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });
}

// Rendering Logic
// Rendering Logic
function getInnerBoxesHTML(parentTitle) {
    // Escaping quotes just in case
    const safeTitle = parentTitle.replace(/'/g, "\\'");
    return `
    <div class="mini-box-container">
        <div class="mini-box" onclick="handleClassClick(event, '${safeTitle}')">
            <div class="mini-box-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div class="mini-box-text">Class</div>
        </div>
        <div class="mini-box" onclick="handleBooksClick(event, '${safeTitle}')">
            <div class="mini-box-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <div class="mini-box-text">Books</div>
        </div>
    </div>
    `;
}

function handleClassClick(e, title) {
    e.stopPropagation();
    openModal(title, 'Class Materials');
}

function handleBooksClick(e, title) {
    e.stopPropagation();
    openModal(title, 'Books & PDFs');
}

// Modal Logic
function openModal(title, subtitle) {
    const modal = document.getElementById('premium-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const wrapper = document.getElementById('modal-content-wrapper');

    if (modal && modalTitle && modalSubtitle && wrapper) {
        modalTitle.innerText = title;
        modalSubtitle.innerText = subtitle;

        // Ensure wrapper is cleaned up
        wrapper.classList.remove('loading');

        modal.classList.remove('hidden');
        // Trigger reflow
        void modal.offsetWidth;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 500); // Match transition duration
    }
}

function renderHSC() {
    const container = document.getElementById('hsc-subjects-container');
    if (!container) return;
    const data = getData();
    container.innerHTML = data.hscSubjects.map((sub, i) => `
        <div class="card" style="animation: fadeIn 0.5s ease forwards; animation-delay: ${i * 0.1}s; opacity: 0;">
            <div style="font-size: 2rem; margin-bottom: 10px;">${sub.icon}</div>
            <h3>${sub.title}</h3>
            ${getInnerBoxesHTML(sub.title)}
        </div>
    `).join('');
}

function renderAdmissions() {
    const container = document.getElementById('admission-items-container');
    if (!container) return;
    const data = getData();
    container.innerHTML = data.admissionItems.map((item, i) => `
        <div class="card" style="animation: fadeIn 0.5s ease forwards; animation-delay: ${i * 0.1}s;">
            <div style="font-size: 2rem; margin-bottom: 10px;">${item.icon}</div>
            <h3>${item.title}</h3>
            ${getInnerBoxesHTML(item.title)}
        </div>
    `).join('');
}

function renderExplore() {
    const container = document.getElementById('explore-container');
    if (!container) return;
    const data = getData();
    container.innerHTML = data.exploreContent.map((item, i) => `
        <div class="card" style="animation: fadeIn 0.5s ease forwards; animation-delay: ${i * 0.1}s;">
            <span style="font-size: 0.8em; text-transform: uppercase; color: var(--primary-color);">${item.type}</span>
            <h3>${item.title}</h3>
            <p>${item.desc || ''}</p>
        </div>
    `).join('');
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Only init if not already present (in case of double firing)
    if (!document.querySelector('.navbar')) {
        handlePreloader();
        renderNavbar();
        renderFooter();
        setupScroll();
    }

    renderHSC();
    renderAdmissions();
    renderExplore();
});
