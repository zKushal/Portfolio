# EmailJS Setup Guide

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the browser — no backend required. This means it works from **any network**.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for a free account.

## Step 2: Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**.
2. Click **Add New Service** and choose your email provider (e.g., Gmail).
3. Follow the prompts to connect your account.
4. Note the **Service ID** (e.g., `service_xxxxxxx`).

## Step 3: Create an Email Template

1. Go to **Email Templates** and click **Create New Template**.
2. Use the following template variables in your template:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{subject}}` — message subject
   - `{{message}}` — message body
3. Example template:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}

   {{message}}
   ```
4. Note the **Template ID** (e.g., `template_xxxxxxx`).

## Step 4: Get Your Public Key

1. Go to **Account** → **General**.
2. Copy your **Public Key**.

## Step 5: Configure the Frontend

Create `frontend/.env` (copy from `frontend/.env.example`):

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Replace the placeholder values with the IDs and key from Steps 2–4.

## Step 6: Test

1. Start the frontend: `cd frontend && npm run dev`
2. Fill in the contact form and click **Send Message**.
3. A popup will confirm success or show an error.

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| "Failed to send your message" | Wrong Service ID / Template ID / Public Key | Double-check the values in `.env` |
| "Invalid email" popup | Email address format is wrong | Enter a valid email (e.g., `user@example.com`) |
| No emails received | Template not configured properly | Check your EmailJS template and service connection |

## Security Notes

- The **Public Key** is safe to expose in the browser.
- Never commit your `.env` file — it is already in `.gitignore`.
- EmailJS free tier allows 200 emails/month.
