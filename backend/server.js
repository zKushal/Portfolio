import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import crypto from 'crypto';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============ DATABASE CONFIGURATION ============
const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Test database connection on startup
db.execute('SELECT 1').then(() => {
  console.log('✅ Connected to Turso database');
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});

// ============ EMAIL CONFIGURATION ============
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

const RECIPIENT_EMAIL = 'kushalbhandari803@gmail.com';
const VERIFICATION_LINK_BASE = process.env.VERIFICATION_LINK_BASE || 'http://localhost:8080/verify';

// ============ VALIDATION FUNCTIONS ============
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const validateFormData = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    errors.push('Subject is required and must be a non-empty string');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required and must be a non-empty string');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// ============ DATABASE OPERATIONS ============
const saveMessageToDatabase = async (name, email, subject, message, token) => {
  try {
    const result = await db.execute({
      sql: 'INSERT INTO UserMessage (name, email, subject, message, token) VALUES (?, ?, ?, ?, ?)',
      args: [name, email, subject, message, token],
    });

    return { success: true, messageId: Number(result.lastInsertRowid) };
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  }
};

const getMessageByToken = async (token) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM UserMessage WHERE token = ? LIMIT 1',
      args: [token],
    });

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

const deleteMessageFromDatabase = async (messageId) => {
  try {
    await db.execute({
      sql: 'DELETE FROM UserMessage WHERE id = ?',
      args: [messageId],
    });

    return { success: true };
  } catch (error) {
    console.error('Database delete error:', error);
    throw error;
  }
};

// ============ EMAIL OPERATIONS ============
const sendVerificationEmail = async (email, name, verificationToken) => {
  try {
    const verificationLink = `${VERIFICATION_LINK_BASE}?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Verify Your Message',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out! Please verify your message by clicking the link below:</p>
        <p style="margin: 20px 0;">
          <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Message
          </a>
        </p>
        <p>Or copy and paste this link in your browser:</p>
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 3px; font-family: monospace; word-break: break-all;">
          ${verificationLink}
        </p>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not submit this form, please ignore this email.</p>
        <hr>
        <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply to this email.</p>
      `,
      text: `
        Hello ${name},
        
        Thank you for reaching out! Please verify your message by visiting this link:
        ${verificationLink}
        
        This link will expire in 24 hours.
        
        If you did not submit this form, please ignore this email.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Verification email error:', error);
    throw error;
  }
};

const sendFinalEmail = async (name, userEmail, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: userEmail,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">You can reply directly to this email to respond to the user.</p>
      `,
      text: `
        New Message from Your Portfolio
        
        Name: ${name}
        Email: ${userEmail}
        Subject: ${subject}
        
        Message:
        ${message}
        
        You can reply directly to this email to respond to the user.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Final email sent to recipient:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Final email error:', error);
    throw error;
  }
};

// ============ ENDPOINTS ============

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Submit contact form
app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate form data
    const validation = validateFormData({ name, email, subject, message });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    // Generate verification token
    const verificationToken = generateToken();

    // Save message to database
    const dbResult = await saveMessageToDatabase(name, email, subject, message, verificationToken);

    if (!dbResult.success) {
      throw new Error('Failed to save message to database');
    }

    // Send verification email
    await sendVerificationEmail(email, name, verificationToken);

    res.status(200).json({
      success: true,
      message: 'Message received! Check your email to verify.',
      messageId: dbResult.messageId,
    });
  } catch (error) {
    console.error('Submit form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your request',
      error: error.message,
    });
  }
});

// Verify email and send final message
app.get('/api/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required',
      });
    }

    // Get message from database
    const message = await getMessageByToken(token);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }

    // Send final email to recipient
    await sendFinalEmail(message.name, message.email, message.subject, message.message);

    // Delete message from database
    await deleteMessageFromDatabase(message.id);

    res.status(200).json({
      success: true,
      message: 'Email verified and message sent successfully!',
    });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying your email',
      error: error.message,
    });
  }
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// ============ SERVER STARTUP ============
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Emails will be sent to: ${RECIPIENT_EMAIL}`);
  console.log(`🔗 Verification link base: ${VERIFICATION_LINK_BASE}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Server shutting down...');
  db.close();
  process.exit(0);
});
