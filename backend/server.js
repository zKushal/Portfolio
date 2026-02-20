import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

const app = express();
const dnsPromises = dns.promises;

// Middleware
app.use(cors());
app.use(express.json());

// Your email configuration
const RECIPIENT_EMAIL = 'kushalbhandari803@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT || 587;

// Email validation regex
const validateEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Check if email domain exists by verifying MX records
const checkEmailExists = async (email) => {
  try {
    const domain = email.split('@')[1];
    
    try {
      await dnsPromises.resolveMx(domain);
      return true;
    } catch (error) {
      return false;
    }
  } catch (error) {
    console.error('Email check error:', error);
    return false;
  }
};

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });
};

// Email validation endpoint
app.post('/api/validate-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Email is required' 
      });
    }

    // Validate email format
    const isValidFormat = validateEmailFormat(email);
    if (!isValidFormat) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Invalid email format' 
      });
    }

    // Check if email domain exists (MX records)
    const emailExists = await checkEmailExists(email);
    if (!emailExists) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Email domain does not exist' 
      });
    }

    res.json({ 
      valid: true, 
      message: 'Email is valid and exists' 
    });
  } catch (error) {
    console.error('Email validation error:', error);
    res.status(500).json({ 
      valid: false, 
      message: 'Error validating email' 
    });
  }
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate all fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    if (!validateEmailFormat(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email address' 
      });
    }

    // Check if email domain exists
    const emailExists = await checkEmailExists(email);
    if (!emailExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email domain does not exist' 
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Send FROM your email
      to: RECIPIENT_EMAIL, // Send TO your email
      replyTo: email, // Set reply-to as user's email so you can reply
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">New Contact Message</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="background-color: #ddd; border: none; height: 1px; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            <hr style="background-color: #ddd; border: none; height: 1px; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">Reply to this email to reach ${name} at ${email}</p>
          </div>
        </div>
      `,
      text: `
From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Reply to this email to reach ${name} at ${email}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);

    res.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Emails will be sent to: ${RECIPIENT_EMAIL}`);
});
