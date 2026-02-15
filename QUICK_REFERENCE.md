# 🎯 Quick Reference - Sikkhagrontho System

## 🔑 Login Credentials

### Admin Account
```
Email: admin@gmail.com
Password: admin
Access: Full Admin Panel + All Features
```

### Student Account
```
Email: student@gmail.com
Password: 123
Access: View Content Only
```

---

## 📂 File Overview

| File | Purpose | Access |
|------|---------|--------|
| `index.html` | Homepage with HSC & Admission sections | Public |
| `register.html` | New user registration | Public |
| `admin.html` | Admin control panel | Admin Only |
| `explore.html` | Browse content with filters | Public |
| `about.html` | About page | Public |
| `contact.html` | Contact form | Public |
| `js/auth.js` | Authentication logic | - |
| `js/data.js` | Data management | - |
| `js/main.js` | UI rendering | - |
| `js/admin.js` | Admin functions | - |
| `css/style.css` | All styles | - |

---

## 🎨 Key Functions Reference

### Authentication
```javascript
handleLogin(event)           // Process login
handleLogout()               // Logout user
handleRegister(event)        // Register new user
openLoginModal()             // Show login modal
openProfileModal()           // Show profile modal
getCurrentUser()             // Get logged-in user
isAdmin()                    // Check if admin
```

### Data Management
```javascript
getData()                    // Get all data
saveData(data)               // Save data
initData()                   // Initialize defaults
```

### UI Rendering
```javascript
renderNavbar()               // Render navbar
renderHSC()                  // Render HSC subjects
renderAdmissions()           // Render admissions
renderExplore()              // Render explore content
toggleTheme()                // Switch theme
```

### Admin Functions
```javascript
switchTab(tabId)             // Switch admin tabs
renderAdminList()            // Render admin content
renderUsers()                // Show users table
addItem(type)                // Add content
deleteItem(type, id)         // Delete content
deleteUser(userId)           // Delete user
```

---

## 🎨 Color Palette

```css
--primary-color: #00fffb     /* Neon Cyan */
--card-bg: #0A1F44           /* Deep Navy Blue */
--bg-gradient-start: #4169E1 /* Royal Blue */
--bg-gradient-end: #151B54   /* Midnight Blue */
--text-color: #ffffff        /* White */
```

---

## 📱 Pages & Features

### Homepage (`index.html`)
- Hero section with tagline
- HSC Subjects grid (with Class/Books mini-boxes)
- Admission Items grid
- Login/Profile modals
- Glassmorphic footer

### Admin Panel (`admin.html`)
**Tabs:**
1. HSC Subjects - Add/Delete subjects
2. Admission Items - Add/Delete items
3. Explore Content - Add/Delete videos/PDFs/info
4. Users - View/Delete users table

### Explore (`explore.html`)
- Filter by: All, Videos, PDFs, Info
- Dynamic content cards
- Click to view (Coming Soon modal)

### Register (`register.html`)
- Name, Email, Phone, Password fields
- Auto-login after registration
- Link back to login

---

## 🔐 Role Permissions

| Feature | Student | Admin |
|---------|---------|-------|
| View Content | ✅ | ✅ |
| Register/Login | ✅ | ✅ |
| View Own Profile | ✅ | ✅ |
| View Other Profiles | ❌ | ✅ (in Users tab) |
| Access Admin Panel | ❌ | ✅ |
| Add Content | ❌ | ✅ |
| Delete Content | ❌ | ✅ |
| Delete Users | ❌ | ✅ (students only) |

---

## 🎯 User Flow

### Student Flow
```
1. Visit homepage
2. Click "Login" → "Register"
3. Fill registration form
4. Auto-login → Homepage
5. Browse HSC/Admission content
6. Click profile avatar to view info
7. Logout when done
```

### Admin Flow
```
1. Visit homepage
2. Click "Login"
3. Enter admin credentials
4. Redirected to Admin Panel
5. Manage content via tabs
6. View all users in Users tab
7. Add/Delete items as needed
8. Logout when done
```

---

## 🛠️ localStorage Keys

```javascript
'sikkhagrontho_data'  // All content & users
'currentUser'         // Logged-in user session
'theme'               // 'dark' or 'light'
```

---

## 🎨 Modal Types

### Login Modal
- Email & password fields
- Password visibility toggle
- Register link
- Error message display

### Profile Modal
- Avatar (circular with border)
- Name, Role, ID, Email, Phone
- Edit Profile button (Coming Soon)
- Logout button

### Content Modal
- Infinity loader animation
- "Coming Soon" message
- Glassmorphic container
- Close button

---

## 🚀 Quick Commands

### Reset to Defaults
```javascript
localStorage.clear()
location.reload()
```

### Check Current User
```javascript
console.log(JSON.parse(localStorage.getItem('currentUser')))
```

### View All Data
```javascript
console.log(JSON.parse(localStorage.getItem('sikkhagrontho_data')))
```

### Force Admin Login (Console)
```javascript
localStorage.setItem('currentUser', JSON.stringify({
  id: 'u-1',
  name: 'Maruf Raihan',
  email: 'admin@gmail.com',
  role: 'admin',
  phone: '+8801700000000',
  avatar: 'https://ui-avatars.com/api/?name=Maruf+Raihan&background=00f5ff&color=000'
}))
location.reload()
```

---

## 📊 Data Structure

### User Object
```javascript
{
  id: 'u-1',
  name: 'User Name',
  email: 'user@example.com',
  password: 'password',
  role: 'student' | 'admin',
  phone: '+8801234567890',
  avatar: 'https://ui-avatars.com/api/...'
}
```

### Content Item (HSC/Admission)
```javascript
{
  id: 'hsc-1',
  title: 'Subject Name',
  icon: '📚'
}
```

### Explore Content
```javascript
{
  id: 'exp-1',
  type: 'video' | 'pdf' | 'info',
  title: 'Content Title',
  desc: 'Description'
}
```

---

## 🎯 Testing Checklist

- [ ] Admin login works
- [ ] Student registration works
- [ ] Admin Panel accessible (admin only)
- [ ] Users tab shows all users
- [ ] Can add/delete content
- [ ] Can delete student users
- [ ] Cannot delete admin users
- [ ] Profile modal shows correct data
- [ ] Theme toggle works
- [ ] Logout clears session
- [ ] Navbar hides/shows on scroll
- [ ] All modals open/close smoothly

---

## 🐛 Troubleshooting

**Problem**: Can't access admin panel
**Solution**: Login as admin@gmail.com / admin

**Problem**: Data not saving
**Solution**: Enable localStorage, disable incognito mode

**Problem**: Profile not showing
**Solution**: Clear cache and refresh

**Problem**: Theme not changing
**Solution**: Check localStorage permissions

---

## 📞 Support

**Email**: sikkhagronthoedu@gmail.com
**Founder**: Maruf Raihan
**Tagline**: *Infinite is strength* ∞

---

**Last Updated**: 2026-02-15
**Version**: 1.0.0
