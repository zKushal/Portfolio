# How to Add Environment Variables in Netlify

If you're having trouble finding Site Settings, here are multiple ways to add environment variables:

---

## **Method 1: Direct from Deploy Settings (Easiest)**

1. **On Netlify Dashboard**, click your site **"superlative-truffle-ec9c93"**
2. Look at the **top menu bar**, you should see these tabs:
   - Deploys
   - Builds (or Build & Deploy)
   - **Settings** ← Click here
   - Analytics
   
3. Once in **Settings**, look for left sidebar menu:
   - Build & deploy
   - **Environment** ← Click here
   
4. Click **"Edit variables"** button
5. Click **"Add a variable"** or **"Add variable"**
6. Fill in:
   - **Key**: `VITE_API_URL`
   - **Value**: `http://localhost:5000/api`
   - Click **"Save"**

7. **Trigger new deploy:**
   - Go to "Deploys" tab
   - Click **"Trigger deploy"** button (top right)
   - Select **"Deploy site"**

---

## **Method 2: From Build & Deploy Tab**

1. Click your site name
2. Click **"Build & deploy"** tab (near top)
3. Look for **"Environment variables"** section (scroll down if needed)
4. Click **"Edit variables"**
5. Add your variable as above

---

## **Method 3: Through Team Settings**

1. In left sidebar, click **"Team settings"**
2. Click **"Environment"**
3. Add the variable for your site

---

## **Visual Guide**

```
Your Netlify Dashboard
├── Portfolio (team name)
│   ├── Projects
│   └── [Your Site "superlative-truffle-ec9c93"]
│       ├── Deploys ← Shows all deployments
│       ├── Builds ← Shows build settings
│       ├── Settings ← CLICK HERE
│       │   ├── General
│       │   ├── Build & deploy
│       │   ├── Environment ← THEN HERE
│       │   ├── Domain management
│       │   └── ...
│       └── Analytics
```

---

## **If Still Can't Find It:**

Try this direct URL format:
```
https://app.netlify.com/sites/superlative-truffle-ec9c93/settings/builds
```

Then look for "Environment variables" section on that page.

---

## **What to Add**

| Field | Value |
|-------|-------|
| **Key** | `VITE_API_URL` |
| **Value** | `http://localhost:5000/api` |

**Note:** We're using `localhost:5000` for now since backend isn't deployed yet. Later, we'll update this to your Render backend URL.

---

## **After Adding Variable:**

1. Go back to **"Deploys"** tab
2. Click **"Trigger deploy"** button (top right)
3. Choose **"Deploy site"**
4. Wait for new build to complete with the new environment variable

---

**Let me know if you still need help finding it!** I can help you troubleshoot further.
