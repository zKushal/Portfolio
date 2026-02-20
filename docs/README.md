# 📚 Documentation

Quick reference for setting up and using your portfolio API.

## 📖 Documentation Files

| Document | Purpose |
|----------|---------|
| **[API_REFERENCE.md](API_REFERENCE.md)** | Complete API specification with all endpoints and examples |
| **[BACKEND_EMAIL_SETUP.md](BACKEND_EMAIL_SETUP.md)** | Gmail SMTP configuration guide |
| **[SETUP_AND_RUN.md](SETUP_AND_RUN.md)** | Getting started guide |

## 🚀 Quick Start

### 1. Configure External Database

Update `backend/.env`:
```env
DB_HOST=your-external-db-host
DB_PORT=3306
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=UserMessage
```

### 2. Configure Email

```env
SENDER_EMAIL=kushalbhandari803@gmail.com
SENDER_PASSWORD=your-app-password
```

### 3. Start Servers

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

## 📊 API Quick Reference

**Endpoints:**
- `POST /api/submit-form` - Submit contact form
- `GET /api/verify-email?token=...` - Verify email and send message
- `GET /api/health` - Health check

**Email Verification Flow:**
```
Submit Form → Verification Email → User Clicks Link → Message Sent → Record Deleted
```

## 🔍 Need Help?

- **API Details** → [API_REFERENCE.md](API_REFERENCE.md)
- **Email Setup** → [BACKEND_EMAIL_SETUP.md](BACKEND_EMAIL_SETUP.md)
- **Getting Started** → [SETUP_AND_RUN.md](SETUP_AND_RUN.md)

