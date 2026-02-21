# Frontend Deployment to Netlify

This guide will walk you through deploying your portfolio frontend to Netlify with free hosting.

---

## ✅ Prerequisites

- [x] GitHub repository with your portfolio code
- [x] Render backend deployed (or have the URL ready)
- [ ] Netlify account

---

## 📋 Step 1: Create Netlify Account

1. Go to **https://netlify.com**
2. Click "Sign up"
3. Choose "GitHub" (recommended for automatic deployments)
4. Authorize Netlify to access your GitHub account
5. Select or authorize your GitHub account

---

## 🔗 Step 2: Connect Your Repository

1. Click "Add new site" → "Import an existing project"  
2. Select "GitHub" as your Git provider
3. If prompted, authorize Netlify again
4. Search for and select your **Portfolio** repository
5. Click "Install" if needed to grant repository access

---

## ⚙️ Step 3: Configure Build Settings

After selecting your repository, you'll see the build configuration screen:

### **Basic Configuration:**
```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

**If these don't match automatically:**
1. Click "Edit configuration" (if available)
2. Set the values above
3. Or continue to step 4 to set them in Site settings

---

## 🔐 Step 4: Set Environment Variables

### **Before Deploying:**

1. In the deployment configuration, look for "Environment variables" section
2. Click "Add" or go to "Edit variables"
3. Add your backend API URL:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://portfolio-backend-xxxxx.onrender.com/api` |

**Replace `xxxxx` with your actual Render backend ID**

---

## 🚀 Step 5: Deploy

### **Main Deploy:**
1. Click "Deploy [your-repo]"
2. Netlify will start the build process
3. Wait for build to complete (usually 2-3 minutes)
4. Once complete, you'll see a deploy preview URL:
   ```
   https://deploy-preview-X--your-site-name.netlify.app
   ```

### **View Deployment:**
- Click "Visit site" or go to the URL
- Your site is now **live and accessible globally**!

---

## 🎯 Step 6: Get Your Live URL

After successful deployment:
- Your site is automatically assigned a URL like: `https://your-site-name.netlify.app`
- You can customize the site name in "Site settings" → "Site details" → "Change site name"

**Share this URL** - visitors can access your portfolio from anywhere!

---

## 🔄 Step 7: Enable Auto-Deployments (Optional but Recommended)

Auto-deployments are **enabled by default**:
- Every time you push to `main` branch, Netlify automatically rebuilds and deploys
- Deployments typically complete in 1-2 minutes

### To verify auto-deployments:
1. Go to "Deploys" tab
2. You should see your latest deployment with status "Published"

---

## 🔧 Troubleshooting

### **Build fails**

**Error: "Cannot find module"**
- Netlify might have different Node version
- Fix: Add to `netlify.toml`:
  ```toml
  [build.environment]
    NODE_VERSION = "20"
  ```

**Error: "VITE_API_URL is undefined"**
- Environment variable not set
- Solution: Re-check Step 4, ensure variable is saved
- Redeploy after setting

### **Site shows "Cannot GET /"**
- SPA routing issue
- Fix: Ensure `netlify.toml` has redirect rules (already included)
- Force redeploy with "Trigger deploy" → "Deploy site"

### **Contact form doesn't work**
- Backend URL might be wrong
- Check: Open browser DevTools → Network tab
- Look at POST request to `/api/submit-form`
- Verify the URL matches your Render backend

### **Slow deployments**
- Normal for first build
- Subsequent deployments are faster with caching
- Check build logs for issues

---

## 📊 Monitor Your Site

### **View Build Logs:**
1. Go to "Deploys" tab
2. Click on a deployment
3. Scroll down to see build output

### **View Errors:**
1. Check "Functions" tab if using serverless functions
2. Check "Analytics" for traffic and errors

---

## 🔐 Custom Domain (Optional)

To use your own domain:
1. Go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS instructions from your domain provider
5. Update `VERIFICATION_LINK_BASE` in backend environment variables

---

## 📝 Environment Variable Reference

Your frontend only needs one environment variable:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

This tells the frontend where to send contact form submissions.

---

## ✨ Next Steps

1. **Test the deployment:**
   - Visit your Netlify URL
   - Fill out the contact form
   - Verify you receive the verification email
   - Click the verification link

2. **Share your site:**
   - Copy your Netlify URL
   - Share with friends and portfolio reviewers
   - Update your resume/LinkedIn profile

3. **Monitor performance:**
   - Check Netlify Analytics
   - Review deployment logs for any warnings

---

## 💡 Pro Tips

✅ **Instant previews** - Every pull request gets a preview URL automatically
✅ **Free SSL** - HTTPS included by default
✅ **Global CDN** - Your site is fast worldwide
✅ **Automatic rollback** - Easy to revert to previous deployments
✅ **Git-based workflow** - Push to deploy, no manual steps needed

---

## 🆘 Need Help?

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Support**: https://answers.netlify.com
- **Check build logs** for specific error messages
- **Common issues**: https://docs.netlify.com/functions/troubleshooting

---

## ✅ Verification Checklist

- [ ] Netlify account created
- [ ] Repository connected
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] First deployment succeeded
- [ ] Site URL shows portfolio
- [ ] Contact form can send messages
- [ ] Backend receives verification link

Once all checked, your frontend is successfully deployed! 🎉
