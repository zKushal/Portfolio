# Kushal's Portfolio

A modern, interactive portfolio website showcasing projects and skills in full-stack development and machine learning.

## 📁 Project Structure

```
Portfolio/
├── frontend/              # React + TypeScript frontend (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
├── backend/               # Node.js + Express API server
│   ├── server.js          # Main server with contact form API
│   ├── schema.sql         # MySQL database schema
│   ├── package.json
│   ├── .env               # (You need to create this)
│   └── .env.example
│
├── docs/                  # Documentation & guides
│   ├── API_REFERENCE.md
│   ├── SECURE_CONTACT_API.md
│   ├── BACKEND_EMAIL_SETUP.md
│   ├── TESTING_GUIDE.md
│   ├── EMAILJS_SETUP.md
│   └── SETUP_AND_RUN.md
│
└── README.md             # This file
```

## 🚀 Quick Start (3 Commands)

### Step 1: Setup Database + Backend Email

Create `backend/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=kushalbhandari803@gmail.com
SENDER_PASSWORD=your-16-char-app-password
PORT=5000

# Turso Database Configuration
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token

# Email Verification
VERIFICATION_LINK_BASE=http://localhost:8080/verify
```

[Get a Turso database →](https://turso.tech)

### Step 2: Start Frontend

```bash
cd frontend
npm install    # If not already installed
npm run dev
```

**Frontend runs on:** `http://localhost:8080`

### Step 3: Start Backend (New Terminal)

```bash
cd backend
npm install    # If not already installed
npm run dev
```

**Backend runs on:** `http://localhost:5000`

---

## 📋 Available Commands

### Frontend
```bash
cd frontend

npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm test           # Run tests
```

### Backend
```bash
cd backend

npm run dev        # Start with auto-reload (nodemon)
npm start          # Start production
```

---

## 🛠 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Three.js

### Backend
- Node.js
- Express.js
- Nodemailer
- Turso (libSQL)
- CORS

---

## 📧 Secure Contact Form API

### Features

✅ **Two-Step Email Verification** - Prevents spam and fake submissions  
✅ **Turso Database** - Serverless SQLite with global replication  
✅ **Cryptographic Tokens** - Secure 64-character tokens  
✅ **SMTP Email** - Direct Gmail integration  
✅ **Input Validation** - All fields validated  
✅ **Error Handling** - Graceful error responses  
✅ **CORS Enabled** - Frontend integration ready  

### Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/submit-form` | Submit contact form & send verification email |
| GET | `/api/verify-email?token=...` | Verify email, send message to recipient, delete record |
| GET | `/api/health` | Health check |

### Email Flow

```
1. User submits form
         ↓
2. POST /api/submit-form (validate & save to DB)
         ↓
3. Verification email sent to user's email
         ↓
4. User clicks verification link
         ↓
5. GET /api/verify-email?token=... (called from email link)
         ↓
6. Message forwarded to kushalbhandari803@gmail.com
         ↓
7. Message deleted from database
```

### Example Request

```bash
curl -X POST http://localhost:5000/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I am interested in your services."
  }'
```

### Example Response

```json
{
  "success": true,
  "message": "Message received! Check your email to verify.",
  "messageId": 1
}
```

---

## 📚 Documentation

- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation
- **[Secure Contact API](docs/SECURE_CONTACT_API.md)** - Setup and deployment guide
- **[Testing Guide](docs/TESTING_GUIDE.md)** - Test cases and examples
- **[Backend Email Setup](docs/BACKEND_EMAIL_SETUP.md)** - Gmail configuration
- **[Setup & Run](docs/SETUP_AND_RUN.md)** - Detailed setup instructions

---

## 🌐 Deployment

### Frontend (Vercel / Netlify)
1. Push frontend folder to GitHub
2. Connect to Vercel/Netlify
3. Deploy

### Backend (Heroku / Railway / Render)
1. Push backend folder to GitHub
2. Set environment variables on platform
3. Deploy

### Database (Turso)
1. Create a Turso database at [turso.tech](https://turso.tech)
2. Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in `.env`
3. The table is created automatically on first startup

---

## 📝 Features

- ✅ Responsive design across all devices
- ✅ Smooth animations & transitions
- ✅ 3D background canvas
- ✅ Dark theme
- ✅ Secure contact form with email verification
- ✅ Projects portfolio
- ✅ Skills showcase
- ✅ About section with profile photo

---

## 🎯 Next Steps

### 1. Update Your Info

- **Hero Section:** Edit `frontend/src/components/Hero.tsx`
- **About Section:** Edit `frontend/src/components/About.tsx`
- **Projects:** Edit `frontend/src/components/Projects.tsx`
- **Skills:** Edit `frontend/src/components/Skills.tsx`

### 2. Configure Email

- Create `backend/.env` with Gmail credentials
- See [Backend Setup Guide](docs/BACKEND_EMAIL_SETUP.md)

### 3. Run Locally

- Start frontend: `cd frontend && npm run dev`
- Start backend: `cd backend && npm run dev`
- Visit http://localhost:8080
- Test contact form

### 4. Deploy

- Push to GitHub
- Deploy frontend and backend separately
- Update `VERIFICATION_LINK_BASE` for production URL

---

## 🔒 Security

- ✅ Email verification prevents spam
- ✅ SQL injection protection (parameterized queries)
- ✅ Credentials in .env (not in code)
- ✅ Unique verification tokens (cryptographic)
- ✅ CORS enabled
- ✅ Input validation on all fields

---

## 📞 Support

See documentation in `/docs` folder for:
- Setup instructions
- API reference
- Testing guide
- Troubleshooting

---

**Built with ❤️ by Kushal**
