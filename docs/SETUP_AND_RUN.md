# Portfolio Setup & Running Guide

## Project Structure

```
Portfolio/
├── src/                    # Frontend (React + TypeScript)
├── server/                 # Backend (Node.js + Express)
├── package.json            # Frontend dependencies
├── server/package.json     # Backend dependencies
└── BACKEND_EMAIL_SETUP.md  # Backend configuration guide
```

## Quick Start (3 Steps)

### Step 1: Setup Backend Email

Follow **[BACKEND_EMAIL_SETUP.md](./BACKEND_EMAIL_SETUP.md)** to:
1. Get Gmail App Password
2. Create `server/.env` file
3. Install backend dependencies

### Step 2: Run Both Servers

**Option A: Two Terminal Windows** (Easy)

Terminal 1 - Frontend:
```bash
npm run dev
# Runs on http://localhost:5173
```

Terminal 2 - Backend:
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Option B: One Terminal** (Advanced)

Install concurrently:
```bash
npm install --save-dev concurrently
```

Update root `package.json` scripts:
```json
"dev:all": "concurrently \"npm run dev\" \"cd server && npm run dev\""
```

Then run:
```bash
npm run dev:all
```

### Step 3: Test

Visit `http://localhost:5173` and fill the contact form to test.

## Available Commands

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Backend
```bash
cd server
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production
npm run build    # Build dependencies
```

## Environment Variables

### Backend (.env in server folder)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-16-char-app-password
PORT=5000
```

### Frontend (.env in root - Optional)
```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment

### Frontend (Vercel / Netlify)
```bash
npm run build
```

Deploy the `dist/` folder.

### Backend (Heroku / Railway / Render)
```bash
cd server
npm install
npm start
```

Set environment variables on the hosting platform.

## Troubleshooting

### "Failed to send message"
1. ✅ Backend running on localhost:5000?
2. ✅ .env file in server folder with correct credentials?
3. ✅ Gmail App Password (not regular password)?

### "Failed to validate email"
1. ✅ Backend is running?
2. ✅ Frontend can reach http://localhost:5000?

### Cannot find module errors
```bash
# In server folder
npm install
```

## File Structure

```
server/
├── package.json          # Backend dependencies
├── server.js            # Main Express server
├── .env                 # Environment variables (create from .env.example)
└── .env.example         # Example configuration

src/
├── components/
│   ├── Contact.tsx      # Contact form (uses backend API)
│   └── ...other components
└── ...rest of frontend
```

## API Endpoints

### Validate Email
```
POST /api/validate-email
Body: { email: "user@example.com" }
Response: { valid: true/false, message: "..." }
```

### Send Email
```
POST /api/send-email
Body: {
  name: "John",
  email: "john@example.com",
  subject: "Hello",
  message: "Hi Kushal..."
}
Response: { success: true/false, message: "..." }
```

### Health Check
```
GET /api/health
Response: { status: "Server is running" }
```

## Tips

- Keep both servers running while developing
- Use VS Code "Split Terminal" for easier viewing
- Check browser console (F12) for frontend errors
- Check terminal output for backend errors
- .env files are git-ignored for security

For detailed backend setup, see [BACKEND_EMAIL_SETUP.md](./BACKEND_EMAIL_SETUP.md)
