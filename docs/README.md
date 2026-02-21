# 📚 Documentation

Quick reference for setting up and running the portfolio.

## 📖 Documentation Files

| Document | Purpose |
|----------|---------|
| **[EMAILJS_SETUP.md](EMAILJS_SETUP.md)** | EmailJS configuration guide (contact form) |
| **[API_REFERENCE.md](API_REFERENCE.md)** | Backend API specification (optional) |
| **[BACKEND_EMAIL_SETUP.md](BACKEND_EMAIL_SETUP.md)** | Backend Gmail SMTP guide (optional) |
| **[SETUP_AND_RUN.md](SETUP_AND_RUN.md)** | Getting started guide |

## 🚀 Quick Start

### 1. Configure EmailJS (Contact Form)

Create `frontend/.env` from `frontend/.env.example`:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

See **[EMAILJS_SETUP.md](EMAILJS_SETUP.md)** for the full setup guide.

### 2. Start Frontend

```bash
cd frontend && npm run dev
```

## 📬 Contact Form Flow

The contact form uses **EmailJS** — a client-side email service that works from any network without a backend:

```
User fills form → Email validated → EmailJS sends message → Toast notification shown
```

## 🔍 Need Help?

- **EmailJS Setup** → [EMAILJS_SETUP.md](EMAILJS_SETUP.md)
- **Getting Started** → [SETUP_AND_RUN.md](SETUP_AND_RUN.md)
- **Backend (optional)** → [BACKEND_EMAIL_SETUP.md](BACKEND_EMAIL_SETUP.md)

