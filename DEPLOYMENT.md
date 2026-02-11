# 🚀 Quick Deployment Guide

## Option 1: GitHub Pages (Recommended - Free)

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click "New repository"
3. Name it `portfolio` or `aarshon-george-portfolio`
4. Make it public
5. Don't initialize with README (we already have one)

### Step 2: Upload Files
```bash
# In your portfolio directory
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

Your portfolio will be live at: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME`

---

## Option 2: Netlify (Free & Easy)

### Step 1: Prepare Files
1. Make sure all files are in one folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

### Step 2: Deploy
1. Go to [Netlify](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git" or drag your folder to the deploy area
4. If using Git: Select your repository and click "Deploy site"
5. If dragging: Drop your folder and wait for deployment

Your site will be live immediately with a random URL like: `https://random-name.netlify.app`

### Step 3: Custom Domain (Optional)
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

---

## Option 3: Vercel (Free & Fast)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
# In your portfolio directory
vercel
```

### Step 3: Follow Prompts
- Login to Vercel (if first time)
- Confirm project name
- Confirm deployment settings
- Wait for deployment

Your site will be live at the provided URL.

---

## Option 4: Local Testing

### Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then visit: `http://localhost:8000`

### Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server
```
Then visit: `http://localhost:8080`

---

## 🔧 Post-Deployment Checklist

### ✅ Test Your Site
- [ ] All sections load correctly
- [ ] Navigation works on mobile
- [ ] Contact form functions
- [ ] All links work
- [ ] Images display properly

### ✅ Update Content
- [ ] Replace placeholder contact information
- [ ] Add real project images
- [ ] Update GitHub/LinkedIn links
- [ ] Add your actual email address

### ✅ SEO Optimization
- [ ] Update meta description in `index.html`
- [ ] Add your name to the title
- [ ] Consider adding Google Analytics

### ✅ Performance Check
- [ ] Test loading speed on mobile
- [ ] Check browser compatibility
- [ ] Validate HTML/CSS

---

## 🌐 Custom Domain Setup

### If you have a domain name:

1. **Point DNS to your hosting provider**
   - For GitHub Pages: Add CNAME record
   - For Netlify: Update nameservers or add CNAME
   - For Vercel: Add CNAME record

2. **Configure in hosting platform**
   - Add custom domain in settings
   - Enable HTTPS (automatic on most platforms)

3. **Wait for propagation** (24-48 hours)

---

## 📱 Mobile Testing

After deployment, test on:
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad Safari
- [ ] Various screen sizes

---

## 🔄 Updates

To update your live site:

### GitHub Pages
```bash
git add .
git commit -m "Update portfolio"
git push
```
Site updates automatically in a few minutes.

### Netlify/Vercel
- Push changes to your Git repository
- Site updates automatically
- Or drag new files to Netlify dashboard

---

## 🆘 Troubleshooting

### Common Issues:

**Site not loading:**
- Check if all files are uploaded
- Verify `index.html` is in the root directory
- Check for typos in file names

**Styling broken:**
- Ensure `styles.css` is in the same folder as `index.html`
- Check browser console for errors
- Verify CSS file path in HTML

**JavaScript not working:**
- Check browser console for errors
- Ensure `script.js` is in the same folder
- Verify script tag in HTML

**Contact form issues:**
- Form is currently simulated (no backend)
- Consider using Formspree or Netlify Forms for real functionality

---

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Create an issue in the repository
- Contact: aarshon.george@email.com

---

**Your portfolio is now live! 🎉** 