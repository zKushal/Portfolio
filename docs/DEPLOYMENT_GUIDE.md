# Free Deployment Guide

Deploy your portfolio for free using **Render (Backend)**, **Netlify (Frontend)**, and **PlanetScale (Database)**.

---

## 🗄️ Step 1: Setup PlanetScale Database

1. **Create PlanetScale Account**
   - Go to https://planetscale.com
   - Sign up with GitHub (recommended)

2. **Create Database**
   - Click "Create a new database"
   - Name: `portfolio-db`
   - Region: Choose closest to your users
   - Click "Create database"

3. **Get Connection String**
   - In database settings, go to "Connect" button (top right)
   - Select "Node.js" driver
   - Copy the connection string that looks like:
     ```
     mysql://[username]:[password]@[host]/[database]
     ```

4. **Setup Database Tables**
   - Go to "Console" tab
   - Run this SQL command:
     ```sql
     CREATE TABLE UserMessage (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL,
       subject VARCHAR(200) NOT NULL,
       message LONGTEXT NOT NULL,
       token VARCHAR(100) UNIQUE NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

---

## 🔧 Step 2: Setup Backend (Render)

### 2a. Prepare Backend Code
1. Ensure your `backend/.env.example` is committed to git
2. All dependencies are in `package.json` ✓

### 2b. Deploy to Render
1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +"  → "Web Service"
   - Connect your GitHub portfolio repository
   - Select it

3. **Configure Service**
   - **Name**: `portfolio-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**
   - Click "Environment"
   - Add these variables:
     ```
     PORT=5000
     HOST=0.0.0.0
     DB_HOST=[from PlanetScale connection string]
     DB_PORT=3306
     DB_USER=[from PlanetScale connection string]
     DB_PASSWORD=[from PlanetScale connection string]
     DB_NAME=portfolio-db
     SENDER_EMAIL=[your Gmail]
     SENDER_PASSWORD=[your Gmail App Password]
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     VERIFICATION_LINK_BASE=https://[your-netlify-domain]/verify
     NODE_ENV=production
     ```

5. **Deploy**
   - Click "Deploy Service"
   - Wait for deployment to complete
   - Your backend URL will be: `https://portfolio-backend-xxxx.onrender.com`
   - **Save this URL** - you'll need it for frontend

---

## 🎨 Step 3: Setup Frontend (Netlify)

### 3a. Update Environment Variables
1. Open `frontend/.env` (create if doesn't exist):
   ```
   VITE_API_URL=https://portfolio-backend-xxxx.onrender.com/api
   ```
   (Replace with your actual Render backend URL from Step 2)

2. Commit and push this change:
   ```bash
   git add frontend/.env
   git commit -m "Add production API URL"
   git push
   ```

### 3b. Deploy to Netlify
1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "Add new site" → "Import an existing project"
   - Select GitHub
   - Authorize Netlify
   - Select your `Portfolio` repository

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Add Environment Variables**
   - In Site settings → "Build & deploy" → "Environment"
   - Click "Edit variables"
   - Add:
     ```
     VITE_API_URL=https://portfolio-backend-xxxx.onrender.com/api
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend URL will be: `https://[your-site-name].netlify.app`

---

## 📧 Step 4: Gmail App Password Setup

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Turn on 2-Step Verification

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character password
   - Use this in `SENDER_PASSWORD` environment variable

---

## ✅ Step 5: Verify Deployment

1. **Test Backend**
   - Visit `https://portfolio-backend-xxxx.onrender.com/api/health`
   - Should return: `{"status":"ok","message":"Server is running"}`

2. **Test Frontend**
   - Visit `https://[your-site-name].netlify.app`
   - Fill out contact form
   - Check your email for verification link
   - Click link and verify message is received

3. **Check Render Logs**
   - If issues, go to Render dashboard
   - Select your service
   - Check "Logs" for errors

---

## 🔄 Updating Deployed Sites

### Update Backend
```bash
git add backend/
git commit -m "Backend updates"
git push
# Render will auto-deploy within seconds
```

### Update Frontend
```bash
git add frontend/
git commit -m "Frontend updates"
git push
# Netlify will auto-deploy within seconds
```

---

## 💡 Troubleshooting

### Backend Won't Deploy
- Check Render logs for errors
- Ensure all environment variables are set
- Verify database connection string is correct
- Check if node_modules is in .gitignore

### Frontend Shows "Failed to connect to server"
- Check `VITE_API_URL` is set correctly
- Verify backend URL doesn't have trailing slash
- Check CORS settings in backend
- Test backend health endpoint

### No verification emails sent
- Check Gmail credentials
- Verify app password is set (not regular password)
- Check spam folder for emails
- Verify email settings in backend environment variables

### Database errors
- Ensure PlanetScale database table exists
- Check connection string format
- Verify credentials don't have special characters (URL encode if needed)

---

## 📚 Additional Resources

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **PlanetScale Docs**: https://planetscale.com/docs
- **Gmail App Passwords**: https://support.google.com/accounts/answer/185833

---

## 🎉 You're Now Live!

Your portfolio is now deployed and accessible to the world! Share your deployment URL and receive messages from anyone on any network.

**Frontend**: `https://[your-site-name].netlify.app`
**Backend API**: `https://portfolio-backend-xxxx.onrender.com/api`
