# 🚀 EmailJS Setup Guide - Quick Start

## 📧 Enable Real Email Sending in 5 Minutes

Follow these steps to enable **real email sending** from your contact form to `sikkhagronthoedu@gmail.com`.

---

## Step 1: Create EmailJS Account (2 minutes)

1. Go to **[https://www.emailjs.com/](https://www.emailjs.com/)**
2. Click **"Sign Up"**
3. Choose **"Sign up with Google"** (easiest) or use email
4. Verify your email if needed
5. You're in! 🎉

---

## Step 2: Add Email Service (1 minute)

1. In EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Choose **"Gmail"** (recommended)
4. Click **"Connect Account"**
5. Sign in with your Google account
6. **Copy your Service ID** (looks like: `service_abc123`)
   - Save this! You'll need it later.

---

## Step 3: Create Email Template (2 minutes)

1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Template Settings:**
   - **Template Name**: "Contact Form"
   - **Subject**: `New Contact Form Message from {{from_name}}`
   - **To Email**: `sikkhagronthoedu@gmail.com`

4. **Email Body** (paste this):
```
Hello,

You have received a new message from the Sikkhagrontho contact form.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent via the Sikkhagrontho Contact Form
Time: {{reply_to}}
```

5. Click **"Save"**
6. **Copy your Template ID** (looks like: `template_xyz789`)
   - Save this! You'll need it later.

---

## Step 4: Get Your Public Key (30 seconds)

1. Click **"Account"** (left sidebar)
2. Click **"General"** tab
3. Find **"Public Key"** section
4. **Copy your Public Key** (looks like: `AbCdEfGhIjKlMnOp`)
   - Save this! You'll need it later.

---

## Step 5: Update contact.html (1 minute)

Open `contact.html` and make these 3 changes:

### Change 1: Uncomment EmailJS Script (Line 14)

**Find:**
```html
<!-- <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script> -->
```

**Change to:**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

---

### Change 2: Update sendEmail Function (Around Line 344)

**Find:**
```javascript
async function sendEmail(formData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, you would use EmailJS or a backend API here
    // Example with EmailJS (uncomment when configured):
    /*
    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: TARGET_EMAIL
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
    */

    // Simulated success
    console.log('Message would be sent to:', TARGET_EMAIL);
    console.log('Form Data:', formData);
    return { success: true };
}
```

**Replace with:**
```javascript
async function sendEmail(formData) {
    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: TARGET_EMAIL
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

**Then replace:**
- `YOUR_SERVICE_ID` → Your Service ID from Step 2
- `YOUR_TEMPLATE_ID` → Your Template ID from Step 3

**Example:**
```javascript
await emailjs.send('service_abc123', 'template_xyz789', {
```

---

### Change 3: Initialize EmailJS (Around Line 430)

**Find:**
```javascript
// Initialize EmailJS (if using)
// Uncomment and configure when ready to use real email sending
/*
(function() {
    emailjs.init('YOUR_PUBLIC_KEY'); // Get from EmailJS dashboard
})();
*/
```

**Replace with:**
```javascript
// Initialize EmailJS
(function() {
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your Public Key
})();
```

**Then replace:**
- `YOUR_PUBLIC_KEY` → Your Public Key from Step 4

**Example:**
```javascript
(function() {
    emailjs.init('AbCdEfGhIjKlMnOp');
})();
```

---

## Step 6: Test! (1 minute)

1. **Save** `contact.html`
2. **Open** `contact.html` in your browser
3. **Fill out** the form:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message from the contact form!
4. **Click** "Send Message"
5. **Wait** for success alert
6. **Check** `sikkhagronthoedu@gmail.com` inbox
7. **You should receive the email!** 🎉

---

## ✅ Configuration Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Service ID copied
- [ ] Email template created
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] Line 14: EmailJS script uncommented
- [ ] sendEmail function updated with Service ID
- [ ] sendEmail function updated with Template ID
- [ ] EmailJS initialized with Public Key
- [ ] File saved
- [ ] Test email sent successfully

---

## 🎯 Quick Reference

### Your Configuration

Fill this out as you go:

```javascript
// Service ID (from Step 2):
service_________________

// Template ID (from Step 3):
template_________________

// Public Key (from Step 4):
_________________________
```

---

## 📝 Example Configuration

Here's what your code should look like after setup:

```javascript
// sendEmail function
async function sendEmail(formData) {
    try {
        await emailjs.send('service_abc123', 'template_xyz789', {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: TARGET_EMAIL
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Initialize EmailJS
(function() {
    emailjs.init('AbCdEfGhIjKlMnOp');
})();
```

---

## 🐛 Troubleshooting

### "emailjs is not defined"
**Problem**: EmailJS script not loaded  
**Solution**: Make sure line 14 is uncommented

### "Invalid service ID"
**Problem**: Wrong Service ID  
**Solution**: Double-check Service ID from EmailJS dashboard

### "Template not found"
**Problem**: Wrong Template ID  
**Solution**: Double-check Template ID from EmailJS dashboard

### "Public key is invalid"
**Problem**: Wrong Public Key  
**Solution**: Copy Public Key exactly from Account → General

### Email not received
**Problem**: Email might be in spam  
**Solution**: 
1. Check spam folder
2. Add EmailJS to safe senders
3. Check EmailJS dashboard for errors

---

## 💡 Tips

1. **Free Plan Limits**: 200 emails/month (plenty for most sites)
2. **Spam Folder**: First email might go to spam
3. **Testing**: Use your own email first to test
4. **Security**: Never commit your Public Key to public repos
5. **Backup**: Save your IDs in a secure place

---

## 🎓 What Happens When User Submits?

```
1. User fills form on your website
   ↓
2. JavaScript validates input
   ↓
3. emailjs.send() is called
   ↓
4. EmailJS receives the data
   ↓
5. EmailJS uses your template
   ↓
6. EmailJS sends email via your Gmail
   ↓
7. Email arrives at sikkhagronthoedu@gmail.com
   ↓
8. Success alert shows on website
```

---

## 🔒 Security Notes

- ✅ Public Key is safe to expose (it's meant to be public)
- ✅ Service ID and Template ID are also safe
- ✅ Your Gmail password is never exposed
- ✅ EmailJS handles all authentication
- ✅ Rate limiting prevents spam
- ✅ No backend server needed

---

## 📊 EmailJS Free Plan

| Feature | Limit |
|---------|-------|
| Emails/month | 200 |
| Email services | 2 |
| Email templates | Unlimited |
| Support | Community |
| Price | FREE |

**Perfect for small to medium websites!**

---

## 🚀 You're Done!

Your contact form is now **fully functional** and will send real emails to `sikkhagronthoedu@gmail.com`!

**Next Steps:**
1. Test thoroughly
2. Monitor EmailJS dashboard
3. Check email deliverability
4. Enjoy automated contact form! 🎉

---

## 📞 Need Help?

- **EmailJS Docs**: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **EmailJS Support**: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
- **Contact Form Docs**: See `CONTACT_FORM_DOCUMENTATION.md`

---

**Made with ❤️ for Sikkhagrontho**  
*Infinite is strength* ∞

**Setup Time**: ~5 minutes  
**Difficulty**: Easy  
**Cost**: FREE
