# Firebase Firestore Setup Guide

This guide walks you through setting up Firebase Firestore for your portfolio backend.

---

## **Step 1: Create Firebase Project**

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. **Project name**: `portfolio`
4. Uncheck **"Enable Google Analytics"** (not needed)
5. Click **"Create project"**
6. Wait for project to be created

---

## **Step 2: Create Firestore Database**

1. In Firebase console, go to **"Build"** → **"Firestore Database"** (left sidebar)
2. Click **"Create database"**
3. **Location**: Choose closest to you
4. **Security rules**: Start in **Test mode** (for development)
5. Click **"Create"**

---

## **Step 3: Create Service Account**

1. Go to **"Project Settings"** (gear icon, top right)
2. Click the **"Service accounts"** tab
3. Click **"Generate new private key"**
4. A JSON file will download - **Keep this safe!**
5. Open the JSON file and copy the following values:

```json
{
  "type": "...",
  "project_id": "YOUR_PROJECT_ID",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-..@your-project.iam.gserviceaccount.com",
  "client_id": "YOUR_CLIENT_ID",
  ...
}
```

---

## **Step 4: Add Environment Variables to .env**

Create or update `backend/.env` with:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=kushalbhandari803@gmail.com
SENDER_PASSWORD=bgoj qekx qgnw cxgv
PORT=5000
HOST=0.0.0.0

# Firebase Configuration (from service account JSON)
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE_WITH_NEWLINES\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id

VERIFICATION_LINK_BASE=https://kusalportfolio.netlify.app/verify
NODE_ENV=production
```

**Important:** Replace `\n` with actual newlines in the `FIREBASE_PRIVATE_KEY` environment variable.

---

## **Step 5: Update Render Environment Variables**

1. Go to **Render** → Your **portfolio-backend** service
2. Go to **"Environment"** section
3. **Update or add** all the Firebase variables above
4. Click **"Save"**
5. Click **"Redeploy"**

---

## **Step 6: Test Deployment**

Check the logs:
```
✅ Server running on http://0.0.0.0:5000
✅ Connected to Firebase Firestore
```

If you see these messages, it's working! 🎉

---

## **Firebase Security Setup (Optional but Recommended)**

For production, update Firestore rules:

1. Go to **Firestore** → **"Rules"** tab
2. Replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /UserMessage/{document=**} {
      allow create: if request.resource.data.email != null;
      allow read, delete: if request.auth != null || request.auth.uid == get(/databases/$(database)/documents/UserMessage/$(document)).data.createdBy;
      allow update: if false;
    }
  }
}
```

3. Click **"Publish"**

---

## **Troubleshooting**

### **Firebase Auth Error**
- Check `FIREBASE_PRIVATE_KEY` has proper newlines
- Make sure all Firebase variables are set correctly
- Check service account key is valid (not expired)

### **Firestore Connection Error**
- Verify database exists and is in "Test mode"
- Check project ID matches service account
- Ensure Firestore database is in same region as Render

### **Messages Still Not Saving**
- Go to Firebase Console → Firestore → Check "UserMessage" collection
- Look for documents being created
- Check browser console for errors

---

## **Local Development**

1. Update `backend/.env.local` with Firebase credentials
2. Run: `npm start`
3. Test at `http://localhost:5000/api/health`

---

**Your backend is now using Firebase Firestore!** 🔥

Next: Update Render environment variables and redeploy.
