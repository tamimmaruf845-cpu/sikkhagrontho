# 🧪 Testing Guide - Sikkhagrontho Role-Based System

## Quick Start Testing

### Method 1: Open Directly
1. Navigate to the project folder: `c:\Users\Lenovo X1 Carbon\.gemini\antigravity\playground\icy-schrodinger`
2. Double-click `index.html` to open in your browser

### Method 2: Use Live Server (Recommended)
1. Open the folder in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 🔐 Test Scenarios

### Scenario 1: Admin Login & Panel Access
**Objective**: Test admin authentication and full panel access

1. **Open** `index.html`
2. **Click** "Login" button in navbar
3. **Enter Credentials**:
   - Email: `admin@gmail.com`
   - Password: `admin`
4. **Click** "Login"
5. **Expected Results**:
   - ✅ Redirected to `admin.html`
   - ✅ Navbar shows profile avatar
   - ✅ "Admin Panel" link visible in navbar
   - ✅ Four tabs: HSC Subjects, Admission Items, Explore Content, Users

6. **Click** "Users" tab
7. **Expected Results**:
   - ✅ Table showing all registered users
   - ✅ Columns: #, Avatar, Name, Email, Phone, Role, ID, Actions
   - ✅ Admin user shows "Protected" instead of Delete button
   - ✅ Student user shows "Delete" button

---

### Scenario 2: Student Registration & Login
**Objective**: Test new user registration and limited access

1. **Open** `index.html`
2. **Click** "Login" button
3. **Click** "Register" link in login modal
4. **Fill Registration Form**:
   - Name: `Test Student`
   - Email: `test@example.com`
   - Phone: `+8801234567890`
   - Password: `test123`
   - Confirm Password: `test123`
5. **Click** "Create Account"
6. **Expected Results**:
   - ✅ Success message appears
   - ✅ Auto-logged in and redirected to homepage
   - ✅ Profile avatar appears in navbar
   - ✅ NO "Admin Panel" link visible

7. **Click** profile avatar
8. **Expected Results**:
   - ✅ Profile modal opens
   - ✅ Shows: Avatar, Name, Role (STUDENT), ID, Email, Phone
   - ✅ "Edit Profile" button (shows "Coming Soon" alert)
   - ✅ "Logout" button

---

### Scenario 3: Role-Based Access Control
**Objective**: Verify students cannot access admin panel

1. **Login as student** (use credentials from Scenario 2)
2. **Try to access** `admin.html` directly by typing URL
3. **Expected Results**:
   - ✅ Alert: "Access Denied! Admin privileges required."
   - ✅ Redirected to `index.html`

---

### Scenario 4: Content Management (Admin Only)
**Objective**: Test add/delete functionality

1. **Login as admin**
2. **Navigate to** Admin Panel
3. **Click** "HSC Subjects" tab
4. **Add New Subject**:
   - Title: `Mathematics`
   - Icon: `📐`
   - Click "Add Subject"
5. **Expected Results**:
   - ✅ Success alert
   - ✅ New subject appears in list with serial number
   - ✅ Delete button available

6. **Click** "Delete" on the new subject
7. **Expected Results**:
   - ✅ Confirmation dialog
   - ✅ Subject removed from list
   - ✅ Serial numbers update

---

### Scenario 5: User Management (Admin Only)
**Objective**: Test viewing and deleting users

1. **Login as admin**
2. **Navigate to** Admin Panel → Users tab
3. **Verify** all registered users are displayed
4. **Click** "Delete" on a student user
5. **Expected Results**:
   - ✅ Confirmation dialog
   - ✅ User removed from table
   - ✅ User cannot login anymore

6. **Try to delete** admin user
7. **Expected Results**:
   - ✅ Shows "Protected" instead of delete button
   - ✅ Admin accounts cannot be deleted

---

### Scenario 6: Theme Toggle
**Objective**: Test light/dark theme switching

1. **Open** any page
2. **Click** theme toggle button (☀️/🌙) in navbar
3. **Expected Results**:
   - ✅ Theme switches instantly
   - ✅ Icon changes (☀️ ↔ 🌙)
   - ✅ Colors invert smoothly
   - ✅ Preference saved (refresh page to verify)

---

### Scenario 7: Profile Modal (Normal User)
**Objective**: Verify users see only their own data

1. **Login as student**
2. **Click** profile avatar
3. **Expected Results**:
   - ✅ Shows ONLY logged-in user's information
   - ✅ No access to other users' data
   - ✅ Role displays as "Student"

4. **Click** "Logout"
5. **Expected Results**:
   - ✅ Session cleared
   - ✅ Redirected to homepage
   - ✅ Navbar shows "Login" button again

---

### Scenario 8: Content Viewing (All Users)
**Objective**: Test HSC subjects and admission items

1. **Open** `index.html` (logged in or out)
2. **Scroll down** to HSC Subjects
3. **Click** "Class" or "Books" mini-box inside a subject card
4. **Expected Results**:
   - ✅ Modal opens with infinity loader animation
   - ✅ "Coming Soon" message displays
   - ✅ Glassmorphic design
   - ✅ Close button works

---

### Scenario 9: Explore Page Filtering
**Objective**: Test content filtering

1. **Navigate to** `explore.html`
2. **Click** filter buttons: All, Videos, PDFs, Info
3. **Expected Results**:
   - ✅ Content filters correctly
   - ✅ Active button highlighted
   - ✅ Smooth animations

---

### Scenario 10: Navbar Behavior
**Objective**: Test scroll hide/show

1. **Open** `index.html`
2. **Scroll down** the page
3. **Expected Results**:
   - ✅ Navbar hides smoothly

4. **Scroll up**
5. **Expected Results**:
   - ✅ Navbar reappears smoothly

---

## ✅ Checklist

### Authentication
- [ ] Admin login works
- [ ] Student login works
- [ ] Registration creates new users
- [ ] Logout clears session
- [ ] Invalid credentials show error
- [ ] Password toggle works

### Role-Based Access
- [ ] Admin sees "Admin Panel" link
- [ ] Student does NOT see "Admin Panel" link
- [ ] Admin can access admin.html
- [ ] Student redirected from admin.html
- [ ] Profile modal shows correct user data

### Admin Panel
- [ ] All 4 tabs work (HSC, Admission, Explore, Users)
- [ ] Can add items to each category
- [ ] Can delete items (with confirmation)
- [ ] Serial numbers display correctly
- [ ] Users table shows all users
- [ ] Can delete student users
- [ ] Cannot delete admin users

### UI/UX
- [ ] Preloader appears and fades
- [ ] Theme toggle works
- [ ] Navbar hides on scroll down
- [ ] Navbar shows on scroll up
- [ ] Modals open/close smoothly
- [ ] Glassmorphism effects visible
- [ ] Animations smooth
- [ ] Responsive on mobile

### Data Persistence
- [ ] Login persists on page refresh
- [ ] Theme preference persists
- [ ] Added content persists
- [ ] Deleted content persists
- [ ] Logout clears session properly

---

## 🐛 Common Issues & Solutions

### Issue: "Access Denied" when accessing admin panel
**Solution**: Make sure you're logged in as admin (admin@gmail.com / admin)

### Issue: Data not persisting
**Solution**: Check browser localStorage is enabled and not in incognito mode

### Issue: Profile avatar not showing
**Solution**: Clear browser cache and refresh page

### Issue: Theme not switching
**Solution**: Check console for errors, ensure localStorage is available

### Issue: Users table empty
**Solution**: Register at least one user, then login as admin to view

---

## 📊 Expected Data Structure

### Default Users in localStorage:
```json
{
  "users": [
    {
      "id": "u-1",
      "name": "Maruf Raihan",
      "email": "admin@gmail.com",
      "password": "admin",
      "role": "admin",
      "phone": "+8801700000000",
      "avatar": "https://ui-avatars.com/api/?name=Maruf+Raihan&background=00f5ff&color=000"
    },
    {
      "id": "u-2",
      "name": "Student User",
      "email": "student@gmail.com",
      "password": "123",
      "role": "student",
      "phone": "+8801900000000",
      "avatar": "https://ui-avatars.com/api/?name=Student+User&background=random"
    }
  ]
}
```

---

## 🎯 Success Criteria

All features working correctly if:
1. ✅ Admin can login and access full admin panel
2. ✅ Students can register, login, and view content
3. ✅ Students CANNOT access admin panel
4. ✅ Admin can view all users in table
5. ✅ Admin can add/delete content
6. ✅ Admin can delete student users but not admins
7. ✅ Profile modal shows correct user info
8. ✅ Theme toggle works and persists
9. ✅ All modals and animations work smoothly
10. ✅ Data persists across page refreshes

---

**Happy Testing! 🚀**
