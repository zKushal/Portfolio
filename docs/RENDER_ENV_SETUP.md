# Backend Environment Variables - Complete Setup Guide

To deploy your backend to Render, you need these environment variables. Follow the steps below to get each value.

---

## **1️⃣ Setup PlanetScale Database (Get DB credentials)**

### **Step 1: Create PlanetScale Account**
1. Go to **https://planetscale.com**
2. Click "Sign up"
3. Sign up with GitHub (recommended)

### **Step 2: Create Database**
1. Click "Create a new database"
2. **Name**: `portfolio-db`
3. **Region**: Choose closest to you (e.g., us-east)
4. Click "Create database"

### **Step 3: Get Connection String**
1. Click on your database `portfolio-db`
2. Click the **"Connect"** button (top right)
3. Select **"Node.js"** from the dropdown
4. You'll see a connection string like:
   ```
   mysql://[username]:[password]@[host]:[port]/portfolio-db?sslAccept=strict
   ```

**Extract these values:**
```
DB_HOST = [host from connection string]
DB_PORT = 3306
DB_USER = [username from connection string]
DB_PASSWORD = [password from connection string]
DB_NAME = portfolio-db
```

**Example:**
```
mysql://root:abc123def456@aws.connect.psdb.cloud:3306/portfolio-db?sslAccept=strict
```

Becomes:
```
DB_HOST = aws.connect.psdb.cloud
DB_USER = root
DB_PASSWORD = abc123def456
DB_NAME = portfolio-db
```

### **Step 4: Create Database Table**
1. In PlanetScale, go to **"Console"** tab
2. Run this SQL command:
```sql
CREATE TABLE UserMessage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message LONGTEXT NOT NULL,
  token VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

✅ **Now you have:** `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

---

## **2️⃣ Setup Gmail App Password**

### **Step 1: Enable 2-Factor Authentication**
1. Go to **https://myaccount.google.com/security**
2. Click "2-Step Verification"
3. Follow steps to enable it

### **Step 2: Generate App Password**
1. Go to **https://myaccount.google.com/apppasswords**
2. Select:
   - **App**: "Mail"
   - **Device**: "Windows Computer"
3. Click "Generate"
4. Google will show a 16-character password
5. Copy it (it auto-fills)

**This is your SENDER_PASSWORD**

Example output:
```
Your app password for Mail on Windows Computer is: abcd efgh ijkl mnop
```

Remove the spaces: `abcdefghijklmnop`

✅ **Now you have:** `SENDER_PASSWORD`

---

## **3️⃣ Compile Your Environment Variables**

With your values, fill in this template:

```env
# Database (from PlanetScale)
DB_HOST=aws.connect.psdb.cloud
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_planetscale_password_here
DB_NAME=portfolio-db

# Email (Gmail)
SENDER_EMAIL=kushalbhandari803@gmail.com
SENDER_PASSWORD=your_16_char_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Server
PORT=5000
HOST=0.0.0.0

# Frontend Verification Link
VERIFICATION_LINK_BASE=https://kusalportfolio.netlify.app/verify

# Optional
NODE_ENV=production
```

---

## **4️⃣ Add to Render**

When deploying to Render:
1. After selecting your repository
2. Go to **"Environment"** section
3. Add each variable from the template above
4. Click "Deploy"

---

## **📝 Copy-Paste Ready Format**

Once you have your actual values, the format for Render is:

| Key | Value |
|-----|-------|
| `DB_HOST` | `aws.connect.psdb.cloud` |
| `DB_PORT` | `3306` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | `your_actual_planetscale_password` |
| `DB_NAME` | `portfolio-db` |
| `SENDER_EMAIL` | `kushalbhandari803@gmail.com` |
| `SENDER_PASSWORD` | `your_16_char_app_password` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `PORT` | `5000` |
| `HOST` | `0.0.0.0` |
| `VERIFICATION_LINK_BASE` | `https://kusalportfolio.netlify.app/verify` |
| `NODE_ENV` | `production` |

---

## **⚠️ Important Notes**

✅ **Keep passwords secure** - Don't commit these to git
✅ **Use app password** - NOT your regular Gmail password
✅ **PlanetScale domain** - Ends with `.psdb.cloud`
✅ **Verification link** - Use your actual Netlify URL

---

## **💡 Testing**

After deployment, test with:
```bash
curl https://your-render-url/api/health
```

Should return:
```json
{"status":"ok","message":"Server is running"}
```

---

**Ready to get your specific values and deploy?** Let me know when you have the PlanetScale info! 🚀
