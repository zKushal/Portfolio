# EmailJS Setup Guide

Follow these steps to enable email functionality on your portfolio:

## Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up with your email (FREE tier available)
3. Verify your email

## Step 2: Add Gmail Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Select **Gmail**
4. Connect your Gmail account (kushalbhandari803@gmail.com)
5. Copy your **Service ID** (format: `service_xxxxx`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Name it: `portfolio_contact`
4. Use this template:

```
From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}
```

5. Copy your **Template ID** (format: `template_xxxxx`)

## Step 4: Get Your Public Key
1. Go to **Account** settings
2. Find **API Keys**
3. Copy your **Public Key** (format: `xxxxx`)

## Step 5: Update Contact Component
Replace the values in `src/components/Contact.tsx`:

```tsx
emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your Public Key

// In handleSubmit function, replace:
await emailjs.send(
  "YOUR_SERVICE_ID_HERE",      // Replace with Service ID
  "YOUR_TEMPLATE_ID_HERE",     // Replace with Template ID
  { ... }
);
```

## Example Values:
- Public Key: `y1x2c3v4b5n6m7a8s9d0`
- Service ID: `service_a1b2c3d4e5f6g7`
- Template ID: `template_x1y2z3a4b5c6d7`

## Testing
1. Save the changes
2. Run `npm run dev`
3. Go to http://localhost:5173
4. Fill and submit the contact form
5. Check your email for the message

## View All Messages
All messages will be sent to: **kushalbhandari803@gmail.com**
Check your Gmail inbox to see all contact messages.

## Troubleshooting
- If emails don't arrive, check Gmail spam folder
- Make sure your Gmail is connected to EmailJS
- Verify all IDs are copied correctly without extra spaces
