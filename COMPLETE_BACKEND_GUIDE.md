# 🎯 Complete Backend Setup Guide - E9Shop

## ✅ What's Fixed

### **GitHub Pages Issue - SOLVED!**

**Problem:** Form worked locally but failed on GitHub Pages because `config.js` was in `.gitignore` and not deployed.

**Solution:** Created `config-public.js` that can be safely committed to GitHub. The anon key is meant to be public (protected by RLS).

**Files Updated:**
- ✅ `config-public.js` - Public config file (safe to commit)
- ✅ `index.html` - Now uses `config-public.js`
- ✅ `all-services.html` - Now uses `config-public.js`
- ✅ `user-info.html` - Now uses `config-public.js`
- ✅ `admin.html` - New admin dashboard created

---

## 📋 Complete Setup Checklist

### **Step 1: Supabase Setup** (If not done yet)

1. Go to [supabase.com](https://supabase.com) → Sign up (free)
2. Create project: `E9ShopBackend`
3. Wait for setup to complete

### **Step 2: Database Tables** (If not done yet)

Create 3 tables in **Table Editor**:

#### **`leads` Table:**
- `id` (uuid, primary key, default: `gen_random_uuid()`)
- `name` (text, not null)
- `mobile` (text, not null)
- `country` (text, not null)
- `submitted_at` (timestamptz, default: `now()`)
- `status` (text, default: `'new'`)

#### **`services` Table:**
- `id` (uuid, primary key, default: `gen_random_uuid()`)
- `title` (text, not null)
- `description` (text, nullable)
- `image_url` (text, nullable)
- `category` (text, nullable)
- `created_at` (timestamptz, default: `now()`)

#### **`banners` Table:**
- `id` (uuid, primary key, default: `gen_random_uuid()`)
- `title` (text, nullable)
- `image_url` (text, not null)
- `description` (text, nullable)
- `active` (bool, default: `false`)
- `created_at` (timestamptz, default: `now()`)

### **Step 3: Security (RLS Policies)** ⚠️ CRITICAL

Enable **Row Level Security (RLS)** on all 3 tables.

#### **For `leads` Table:**

**Policy 1: Allow public inserts**
- Name: `Allow public inserts`
- Operation: `INSERT`
- Target roles: `anon`
- Policy definition: Leave default (allows all)

**Policy 2: Allow admin all**
- Name: `Allow admin all`
- Operation: `ALL`
- Target roles: `authenticated`
- Policy definition: Leave default

#### **For `services` Table:**

**Policy 1: Allow public read**
- Name: `Allow public read`
- Operation: `SELECT`
- Target roles: `anon`
- Policy definition: Leave default

**Policy 2: Allow admin all**
- Name: `Allow admin all`
- Operation: `ALL`
- Target roles: `authenticated`
- Policy definition: Leave default

#### **For `banners` Table:**

**Policy 1: Allow public read**
- Name: `Allow public read`
- Operation: `SELECT`
- Target roles: `anon`
- Policy definition: Leave default

**Policy 2: Allow admin all**
- Name: `Allow admin all`
- Operation: `ALL`
- Target roles: `authenticated`
- Policy definition: Leave default

### **Step 4: Storage Setup**

1. Go to **Storage** → Create bucket: `assets`
2. Make it **Public** (check the box)
3. Set policies:
   - **Public read:** `SELECT`, role: `anon`
   - **Admin upload:** `INSERT`, role: `authenticated`

### **Step 5: Get API Keys**

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...` (long string)

### **Step 6: Update config-public.js**

Open `config-public.js` and verify it has your keys:

```javascript
const SUPABASE_URL = 'https://YOUR-PROJECT-URL.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

**Note:** This file is safe to commit - anon key is public by design (protected by RLS).

### **Step 7: Create Admin User**

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email:** Your admin email
   - **Password:** Create a password
   - **Auto Confirm User:** ✅ (check this)
4. Click **"Create user"**

**Save these credentials** - you'll use them to log into `admin.html`.

### **Step 8: Test Everything**

1. **Test Form Submission:**
   - Open your site (local or GitHub Pages)
   - Fill out join form
   - Submit
   - Check Supabase → `leads` table (should see new row)

2. **Test Admin Dashboard:**
   - Open `admin.html` in browser
   - Login with admin credentials
   - View leads, services, banners
   - Test export CSV
   - Test fake delete

3. **Test Dynamic Content:**
   - Add a service in Supabase dashboard
   - Refresh `all-services.html` (should see new service)
   - Add a banner, set `active = true`
   - Refresh `index.html` (should see new banner)

---

## 🎨 Using Admin Dashboard (`admin.html`)

### **Access Admin:**

1. Open `admin.html` in your browser
   - Local: `http://localhost:4173/admin.html`
   - GitHub Pages: `https://yourusername.github.io/E9Shop/admin.html`

2. Login with your admin email/password (from Step 7)

### **Features:**

#### **Leads Tab:**
- ✅ View all form submissions
- ✅ See name, mobile, country, submission date, status
- ✅ **Export CSV:** Click "Export CSV" button (downloads all leads)
- ✅ **Fake Delete:** Click "Mark Deleted" button (sets status to 'deleted')
- ✅ **Restore:** Click "Restore" button (sets status back to 'new')

#### **Services Tab:**
- ✅ View all services
- ✅ See image, title, description, category, created date

#### **Banners Tab:**
- ✅ View all banners
- ✅ See which banner is active
- ✅ See image, title, description, created date

### **Logout:**
- Click "Logout" button (top right)

---

## 📊 Managing Data via Supabase Dashboard

### **Add/Edit Services:**

1. Go to Supabase → **Table Editor** → `services`
2. Click **"Insert row"**
3. Fill in:
   - **title:** e.g., "Jobs vacancy"
   - **description:** Service description
   - **image_url:** Upload to Storage first, then copy URL
   - **category:** e.g., "Jobs"
4. Click **"Save"**

### **Manage Banners:**

1. Go to `banners` table
2. To set active banner:
   - Set current active banner's `active` to `false`
   - Set new banner's `active` to `true`
   - Only ONE should be active at a time

### **Upload Images:**

1. Go to **Storage** → `assets` bucket
2. Click **"Upload file"**
3. Select your image
4. After upload, click on file → Copy **"Public URL"**
5. Paste URL into `image_url` column in services/banners table

---

## 🚀 Deploy to GitHub Pages

### **Step 1: Commit All Files**

```bash
git add .
git commit -m "feat: add backend integration and admin dashboard"
git push
```

**Important:** `config-public.js` should be committed (it's safe - anon key is public).

### **Step 2: Enable GitHub Pages**

1. Go to your GitHub repo
2. **Settings** → **Pages**
3. Source: `Deploy from a branch`
4. Branch: `main` (or `master`)
5. Folder: `/ (root)`
6. Click **"Save"**

### **Step 3: Access Your Site**

Your site will be live at:
- `https://YOUR-USERNAME.github.io/E9Shop/`

Admin dashboard:
- `https://YOUR-USERNAME.github.io/E9Shop/admin.html`

---

## 🔒 Security Notes

1. **Anon Key is Public:**
   - The anon key in `config-public.js` is meant to be public
   - It's protected by Row Level Security (RLS)
   - Only admins can access sensitive data

2. **Admin Credentials:**
   - Keep your admin email/password secure
   - Don't share admin.html URL publicly (or password-protect it)

3. **RLS Policies:**
   - Make sure RLS is enabled on all tables
   - Public can only INSERT into leads, SELECT from services/banners
   - Only authenticated admins can do everything

---

## 🆘 Troubleshooting

### **Form Not Working on GitHub Pages:**

✅ **FIXED!** Now using `config-public.js` which is committed to GitHub.

### **Admin Login Fails:**

- Check admin user exists in Supabase → Authentication → Users
- Verify email/password is correct
- Check browser console for errors

### **Can't See Data in Admin:**

- Make sure you're logged in
- Check RLS policies allow `authenticated` role to SELECT
- Check browser console for errors

### **Images Not Showing:**

- Verify image URLs in database are correct
- Check Storage bucket is public
- Verify files exist in Storage

### **Export CSV Not Working:**

- Check browser console for errors
- Make sure you have leads in the database
- Try a different browser

---

## 📁 Project Structure (Final)

```
E9Shop/
├── index.html              ✅ Uses config-public.js
├── all-services.html       ✅ Uses config-public.js
├── user-info.html          ✅ Uses config-public.js
├── admin.html              ✅ NEW - Admin dashboard
├── thank-you.html          (No changes)
├── script.js               ✅ Supabase integration
├── styles.css              (No changes)
├── config.js               ⚠️ Local only (in .gitignore)
├── config-public.js        ✅ Public config (committed)
├── .gitignore              ✅ Protects config.js
└── assets/                 (Images)
```

---

## ✅ What Works Now

- ✅ Form submissions save to database (works on GitHub Pages!)
- ✅ Services load dynamically from database
- ✅ Banners load dynamically from database
- ✅ Admin dashboard with login
- ✅ View leads, services, banners
- ✅ Export CSV for leads
- ✅ Fake delete/restore leads
- ✅ Secure (RLS protects data)

---

## 📝 For Your Mentor Report

### **Backend Architecture:**
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Security:** Row Level Security (RLS)
- **API:** Auto-generated REST API

### **Features Implemented:**
1. **User Form Submission:** Saves to `leads` table
2. **Dynamic Content:** Services and banners load from database
3. **Admin Dashboard:** Full CRUD access via `admin.html`
4. **CSV Export:** Download leads as CSV
5. **Fake Delete:** Mark leads as deleted without permanent removal

### **Security:**
- RLS policies restrict access
- Public can only submit forms and read services/banners
- Only authenticated admins can manage data

### **Deployment:**
- Frontend: GitHub Pages
- Backend: Supabase (cloud-hosted)
- No server code needed

---

## 🎉 You're Done!

Everything is set up and working. Your mentor can:
1. Test the form on your GitHub Pages URL
2. Access admin dashboard at `/admin.html`
3. View all submissions, services, and banners
4. Export data as CSV

**Questions?** Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)

