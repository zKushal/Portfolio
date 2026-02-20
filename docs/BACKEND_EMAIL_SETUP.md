# Backend Email Setup Guide

This guide will help you set up the backend to send emails from user's email addresses.

## What This Does

- ✅ Validates user email addresses before sending
- ✅ Sends email FROM the user's email address
- ✅ Sends email TO kushalbhandari803@gmail.com
- ✅ You receive the message with user's email as sender
- ✅ You can reply directly to user's email

## Prerequisites

- Node.js installed
- Gmail account (for relay/SMTP)
- 5 minutes setup time

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 2: Configure Gmail for SMTP

### For Gmail:

1. Go to [Gmail Account Settings](https://myaccount.google.com/)
2. Click **Security** (left sidebar)
3. Enable **2-Step Verification** if not already enabled
4. Under "App passwords", select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device)
5. Google will generate a 16-character password
6. Copy this password (you'll use it in .env)

## Step 3: Create .env File

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

Edit `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your-gmail@gmail.com
SENDER_PASSWORD=your-16-char-app-password
PORT=5000
```

**Example:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=kushalbhandari803@gmail.com
SENDER_PASSWORD=abcd efgh ijkl mnop
PORT=5000
```

> ⚠️ **Important**: The `SENDER_PASSWORD` should be the 16-character Google App Password, NOT your regular Gmail password.

## Step 4: Start Backend Server

From the server folder:

```bash
npm run dev
```

You should see:
```
✅ Server running on http://localhost:5000
📧 Emails will be sent to: kushalbhandari803@gmail.com
```

## Step 5: Configure Frontend

The frontend is already configured to use the backend API.

### For Development (running locally):
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Everything should work by default!

### For Production:
Create a `.env.production` in root:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Step 6: Test the Contact Form

1. Start backend: `npm run dev` (in server folder)
2. In another terminal, start frontend: `npm run dev`
3. Visit `http://localhost:5173`
4. Go to Contact section
5. Fill in the form and click "Send Message"
6. Check your email inbox for the message

## How It Works

1. **User fills form** with name, email, subject, message
2. **Frontend validates** the form has all fields
3. **Frontend calls backend** `/api/validate-email` to check email format
4. **If valid**, frontend calls `/api/send-email`
5. **Backend validates** email again
6. **Backend sends email** FROM user's email TO kushalbhandari803@gmail.com
7. **Backend returns success** message to frontend
8. **User sees confirmation** message

## Email Format

User receives an email like:

```
From: user@example.com
To: kushalbhandari803@gmail.com
Subject: Portfolio Contact: User's Subject

New Contact Message
From: John Doe
Email: john@example.com
Subject: User's Subject

Message:
This is the user's message...
```

## Troubleshooting

### "Failed to validate email"
- Check backend is running on localhost:5000
- Check frontend can reach backend

### "Invalid email address"
- Email format is incorrect
- Make sure email looks like: user@domain.com

### "Failed to send email"
- Check SENDER_EMAIL and SENDER_PASSWORD in .env
- Verify Gmail Account has 2-Step Verification enabled
- Verify the App Password is correct (16 characters)
- Check gmail allows "Less secure apps" (if not using App Password)

### Email not arriving
- Check spam folder
- Verify SENDER_EMAIL is configured correctly
- Check Gmail allows SMTP connections
- Restart backend server after changing .env

## Production Deployment

When deploying to production:

1. Deploy backend (Heroku, Railway, Render, etc.)
2. Get production backend URL
3. Add `VITE_API_URL` to frontend .env
4. Deploy frontend
5. Set environment variables on hosting platform:
   - `SENDER_EMAIL`
   - `SENDER_PASSWORD`
   - `SMTP_HOST`
   - `SMTP_PORT`

## Security Notes

- Never commit `.env` file to git
- `.env` is in `.gitignore`
- Use App Passwords, not your actual Gmail password
- The backend validates all inputs before sending

## Support

If you need help, check:
1. Console errors (both frontend and backend)
2. Gmail settings allow SMTP
3. .env file is in `server/` folder (not root)
4. All dependencies are installed
