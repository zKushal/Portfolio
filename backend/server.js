import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import crypto from 'crypto';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
app.use(express.json());
app.options('*', cors());

// ============ FIREBASE INITIALIZATION ============
let db;

function initializeFirebase() {
  try {
    // Use base64-encoded service account JSON for better compatibility
    const firebaseCredentials = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    
    if (!firebaseCredentials) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is required');
    }

    // Decode base64 and parse JSON
    const serviceAccountKey = JSON.parse(
      Buffer.from(firebaseCredentials, 'base64').toString('utf-8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
    });
    
    db = admin.firestore();
    console.log('✅ Connected to Firebase Firestore');
    console.log(`📦 Project ID: ${serviceAccountKey.project_id}`);
  } catch (err) {
    console.error('❌ Firebase initialization failed:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
}

initializeFirebase();

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
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  } else if (data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (data.message.trim().length > 5000) {
    errors.push('Message must not exceed 5000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// ============ DATABASE OPERATIONS ============
const saveMessageToDatabase = async (name, email, subject, message, token) => {
  try {
    const docRef = await db.collection('UserMessage').add({
      name,
      email,
      subject,
      message,
      token,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, messageId: docRef.id };
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  }
};

const getMessageByToken = async (token) => {
  try {
    const snapshot = await db.collection('UserMessage')
      .where('token', '==', token)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

const deleteMessageFromDatabase = async (messageId) => {
  try {
    await db.collection('UserMessage').doc(messageId).delete();
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
      return res.status(500).json({
        success: false,
        message: 'Failed to save message. Please try again.',
        errors: ['Database error: Could not save your message'],
      });
    }

    // Send verification email
    try {
      await sendVerificationEmail(email, name, verificationToken);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Delete the saved message if email sending fails
      await deleteMessageFromDatabase(dbResult.messageId);
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email',
        errors: ['Could not send verification email. Please check your email address and try again.'],
      });
    }

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
      errors: ['An unexpected error occurred. Please try again later.'],
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
        errors: ['No verification token provided'],
      });
    }

    // Get message from database
    const message = await getMessageByToken(token);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired verification token',
        errors: ['The verification link has expired or is invalid. Please submit the form again.'],
      });
    }

    // Send final email to recipient
    try {
      await sendFinalEmail(message.name, message.email, message.subject, message.message);
    } catch (emailError) {
      console.error('Final email sending failed:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send your message',
        errors: ['Could not send your message to the recipient. Please try again.'],
      });
    }

    // Delete message from database
    try {
      await deleteMessageFromDatabase(message.id);
    } catch (deleteError) {
      console.error('Database cleanup error:', deleteError);
      // Still return success since the email was sent
    }

    res.status(200).json({
      success: true,
      message: 'Email verified! Your message has been sent successfully.',
      errors: [],
    });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying your email',
      errors: ['An unexpected error occurred. Please try again.'],
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
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
  console.log(`📧 Emails will be sent to: ${RECIPIENT_EMAIL}`);
  console.log(`🔗 Verification link base: ${VERIFICATION_LINK_BASE}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Server shutting down...');
  await admin.app().delete();
  process.exit(0);
});
