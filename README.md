# Sikkhagrontho - Role-Based Educational Website System

## 🎯 Overview
A complete role-based educational website with authentication, admin panel, and dynamic content management.

## ✨ Features Implemented

### 1. **User Roles**
- **Normal User (Student)**
  - Can register and login
  - View only their own profile information
  - Access HSC Subjects, Admission Items, and Explore Content
  - Cannot see other users' data
  
- **Admin User**
  - Full access to Admin Panel
  - View all users' information in a table
  - Add/Edit/Delete HSC Subjects, Admission Items, and Explore Content
  - Manage all registered users (except other admins)

### 2. **Authentication System**
- **Login**: Email & password authentication
- **Registration**: New users can create accounts
- **Session Management**: Uses localStorage to maintain user sessions
- **Role-Based Redirects**: 
  - Admin → Admin Panel
  - Student → Homepage
- **Protected Routes**: Admin panel requires admin role

### 3. **Profile Modal**
- Shows user avatar, name, ID, email, phone, and role
- Normal users see only their own info
- Admin users see their own info in profile modal
- "Edit Profile" button (Coming Soon alert)
- Logout button clears session and redirects

### 3.5. **Profile Dropdown Menu** ⭐ NEW
- **Dynamic Navbar**: Shows profile avatar when logged in
- **Dropdown Menu**: Click avatar to open menu with:
  - User info header (avatar, name, email)
  - "My Profile" option → Opens profile modal
  - "Logout" option → Clears session & reloads
- **Smart Behavior**: 
  - Click outside to close
  - Smooth animations
  - Glassmorphic design
- **Responsive**: Works on mobile & desktop
- **See**: `DROPDOWN_FEATURE.md` for full documentation
- **Demo**: `dropdown-demo.html`

### 4. **Admin Panel**
Four main tabs:
- **HSC Subjects**: Add/Delete subjects with icons
- **Admission Items**: Add/Delete admission categories
- **Explore Content**: Add/Delete videos, PDFs, and info items
- **Users**: View all registered users in a table with:
  - Serial number, Avatar, Name, Email, Phone, Role, ID
  - Delete option (admin accounts protected)

### 5. **Content Management**
- All content stored in localStorage
- Dynamic rendering with JavaScript
- Serial numbering for all items
- Click-to-view modals with "Coming Soon" content

### 6. **Theme Toggle**
- Light/Dark theme switcher
- Persists in localStorage
- Icon changes based on theme
- Smooth transitions

### 7. **Preloader**
- Infinity symbol (∞) animation
- Pulsing neon cyan shine effect
- Fades out after page load

### 8. **Navigation**
- **Navbar**: 
  - Home, Explore, About, Contact links
  - Login button (when logged out)
  - Profile avatar (when logged in)
  - Admin Panel link (admin only)
  - Theme toggle button
- **Footer**: Quick links and social icons (Home page only)

### 9. **Scroll Behavior**
- Navbar hides on scroll down
- Shows on scroll up
- Smooth animations

### 10. **Design**
- Glassmorphism style for modals, cards, and forms
- Neon cyan (#00fffb) primary color
- Deep navy blue card backgrounds
- Smooth animations and transitions
- Responsive design

## 📁 File Structure

```
icy-schrodinger/
├── index.html          # Homepage with HSC & Admission sections
├── register.html       # User registration page
├── admin.html          # Admin panel (protected)
├── explore.html        # Explore content page
├── about.html          # About page
├── contact.html        # Contact page
├── profile.html        # Profile page (legacy)
├── dropdown-demo.html  # Profile dropdown demo ⭐ NEW
├── README.md           # Main documentation
├── TESTING_GUIDE.md    # Testing scenarios
├── QUICK_REFERENCE.md  # Quick reference card
├── ARCHITECTURE.md     # System architecture
├── DROPDOWN_FEATURE.md # Dropdown documentation ⭐ NEW
├── css/
│   └── style.css       # Main stylesheet
└── js/
    ├── data.js         # Data management (localStorage)
    ├── auth.js         # Authentication & session management
    ├── main.js         # Main UI functions
    └── admin.js        # Admin panel functions
```

## 🔐 Default Users

### Admin Account
- **Email**: admin@gmail.com
- **Password**: admin
- **Role**: admin

### Student Account
- **Email**: student@gmail.com
- **Password**: 123
- **Role**: student

## 🚀 Key Functions

### Authentication (`js/auth.js`)
- `handleLogin(event)` - Process login
- `handleLogout()` - Clear session and redirect
- `handleRegister(event)` - Create new user account
- `openLoginModal()` / `closeLoginModal()` - Login modal controls
- `openProfileModal()` / `closeProfileModal()` - Profile modal controls
- `getCurrentUser()` - Get logged-in user
- `isAdmin()` - Check if user is admin
- `protectAdminPage()` - Restrict admin page access

### Data Management (`js/data.js`)
- `getData()` - Retrieve all data from localStorage
- `saveData(data)` - Save data to localStorage
- `initData()` - Initialize default data

### UI Rendering (`js/main.js`)
- `renderNavbar()` - Dynamic navbar with role-based links
- `renderFooter()` - Footer (home page only)
- `renderHSC()` - Render HSC subjects
- `renderAdmissions()` - Render admission items
- `renderExplore()` - Render explore content
- `toggleTheme()` - Switch between light/dark themes
- `toggleProfileDropdown(event)` - Toggle profile dropdown menu ⭐ NEW
- `closeProfileDropdown()` - Close profile dropdown ⭐ NEW
- `handleClickOutsideDropdown(event)` - Close dropdown when clicking outside ⭐ NEW

### Admin Functions (`js/admin.js`)
- `switchTab(tabId)` - Switch between admin tabs
- `renderAdminList()` - Render all admin content
- `renderUsers()` - Display users table
- `addItem(type)` - Add new content item
- `deleteItem(type, id)` - Delete content item
- `deleteUser(userId)` - Delete user account

## 🎨 Design Features

### Glassmorphism
- Semi-transparent backgrounds
- Backdrop blur effects
- Subtle borders
- Soft shadows

### Animations
- Fade-in effects for cards
- Hover transformations
- Smooth transitions
- Infinity loader with flowing shine

### Color Scheme
- **Primary**: Neon Cyan (#00fffb)
- **Background**: Royal Blue to Midnight Blue gradient
- **Cards**: Deep Navy Blue (#0A1F44)
- **Text**: White/Off-white

## 📱 Responsive Design
- Mobile-friendly navbar
- Flexible grid layouts
- Adaptive card sizes
- Touch-friendly buttons

## 🔒 Security Features
- Role-based access control
- Protected admin routes
- Session validation
- Admin accounts cannot be deleted

## 🎯 Usage Instructions

### For Normal Users:
1. **Register**: Click "Login" → "Register" link
2. **Login**: Use email and password
3. **Browse**: View HSC subjects, admission items, explore content
4. **Profile**: Click avatar to open dropdown menu ⭐ NEW
   - Select "My Profile" to view full profile
   - Select "Logout" to end session
5. **Alternative**: Click avatar directly to view profile (old method still works)

### For Admins:
1. **Login**: Use admin credentials
2. **Access Admin Panel**: Automatically redirected or click "Admin Panel" link
3. **Manage Content**: Use tabs to add/delete items
4. **View Users**: Click "Users" tab to see all registered users
5. **Delete Users**: Click delete button (students only)

## 🌟 Future Enhancements (Coming Soon)
- Edit Profile functionality
- Edit content items
- User role management
- Content upload (videos, PDFs)
- Search and filter
- User statistics
- Email notifications

## 📝 Notes
- All data stored in browser localStorage
- Clearing browser data will reset to defaults
- Admin panel requires admin role
- Normal users cannot access other users' data
- Theme preference persists across sessions

## 🛠️ Technologies Used
- **HTML5**: Structure
- **CSS3**: Styling with glassmorphism
- **Vanilla JavaScript**: All functionality
- **LocalStorage**: Data persistence
- **Google Fonts**: Inter, Poppins, Sora, Space Grotesk

---

**Tagline**: *Infinite is strength* ∞
