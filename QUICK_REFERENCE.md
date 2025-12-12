# ⚡ Quick Reference - E9Shop Backend

## 🔗 Important URLs

- **Your Site:** `https://YOUR-USERNAME.github.io/E9Shop/`
- **Admin Dashboard:** `https://YOUR-USERNAME.github.io/E9Shop/admin.html`
- **Supabase Dashboard:** [app.supabase.com](https://app.supabase.com)

## 🔑 Admin Login

- **Email:** (Your admin email from Supabase)
- **Password:** (Your admin password)
- **Location:** Open `admin.html` in browser

## 📋 Quick Tasks

### **View Form Submissions:**
1. Open `admin.html` → Login
2. Click "Leads" tab
3. See all submissions

### **Export Leads as CSV:**
1. Admin dashboard → Leads tab
2. Click "Export CSV" button
3. File downloads automatically

### **Fake Delete a Lead:**
1. Admin dashboard → Leads tab
2. Click "Mark Deleted" button on any lead
3. Lead status changes to 'deleted' (not permanently removed)

### **Add a Service:**
1. Supabase Dashboard → Table Editor → `services`
2. Click "Insert row"
3. Fill in: title, description, image_url, category
4. Save

### **Change Banner:**
1. Supabase Dashboard → Table Editor → `banners`
2. Set current active banner's `active` to `false`
3. Set new banner's `active` to `true`
4. Only ONE should be active

### **Upload Image:**
1. Supabase Dashboard → Storage → `assets` bucket
2. Upload file
3. Click file → Copy "Public URL"
4. Paste URL into `image_url` column

## 🆘 Common Issues

**Form not working?**
- Check `config-public.js` has correct Supabase URL and key
- Verify RLS policies are set correctly

**Can't login to admin?**
- Check admin user exists in Supabase → Authentication → Users
- Verify email/password

**Images not showing?**
- Check image URLs in database are correct
- Verify Storage bucket is public

## 📚 Full Guide

See `COMPLETE_BACKEND_GUIDE.md` for detailed instructions.

