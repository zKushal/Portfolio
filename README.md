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
│   ├── server.js
│   ├── package.json
│   ├── .env               # (You need to create this)
│   └── .env.example
│
├── docs/                  # Documentation & guides
│   ├── BACKEND_EMAIL_SETUP.md
│   ├── EMAILJS_SETUP.md
│   └── SETUP_AND_RUN.md
│
└── README.md             # This file
```

## 🚀 Quick Start (3 Commands)

### Step 1: Setup Backend Email (.env)

Create `backend/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=kushalbhandari803@gmail.com
SENDER_PASSWORD=your-16-char-app-password
PORT=5000
```

[Get Gmail App Password →](docs/BACKEND_EMAIL_SETUP.md)

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
- CORS

## 📧 Contact Form Features

✅ **Email Validation** - Checks if email domain exists  
✅ **Direct Sending** - Sends emails to kushalbhandari803@gmail.com  
✅ **Reply Support** - You can reply directly to user's email  
✅ **User Feedback** - Shows success/error messages  
✅ **Secure** - Validates all inputs before sending  

## 📚 Documentation

- [Backend Email Setup](docs/BACKEND_EMAIL_SETUP.md) - Complete email configuration guide
- [Setup & Run Guide](docs/SETUP_AND_RUN.md) - Detailed setup instructions

## 🌐 Deployment

### Frontend (Vercel / Netlify)
1. Push frontend folder to GitHub
2. Connect to Vercel/Netlify
3. Deploy

### Backend (Heroku / Railway / Render)
1. Push backend folder to GitHub
2. Set environment variables on platform
3. Deploy

## 📝 Features

- ✅ Responsive design across all devices
- ✅ Smooth animations & transitions
- ✅ 3D background canvas
- ✅ Dark/light theme support
- ✅ Contact form with email validation
- ✅ Projects portfolio
- ✅ Skills showcase
- ✅ About section with profile photo

## 🎯 Next Steps

1. **Update your info:**
   - Edit `frontend/src/components/Hero.tsx` - Change name & roles
   - Edit `frontend/src/components/About.tsx` - Update bio
   - Edit `frontend/src/components/Projects.tsx` - Add your projects
   - Edit `frontend/src/components/Skills.tsx` - Update skills

2. **Configure email:**
   - Create `backend/.env` with Gmail credentials
   - See [Backend Setup Guide](docs/BACKEND_EMAIL_SETUP.md)

3. **Run locally:**
   - Start frontend and backend servers
   - Test contact form at http://localhost:8080

4. **Deploy:**
   - Push to GitHub
   - Deploy frontend and backend separately
   - Update frontend API URL for production

## 📞 Support

For issues or questions, refer to the documentation in `/docs` folder.

## 📄 License

MIT

---

**Built with ❤️ by Kushal**
