require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const mysql = require('mysql2/promise');

const app = express();

// ====== Security Headers Setup ====== //
app.use(helmet()); // Helmet sets most headers like HSTS, CSP, X-Content-Type-Options, etc.

app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), camera=(), microphone=(), fullscreen=(self)'
  );
  next();
});

// ====== CORS and Body Parsers ====== //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====== Static Files ====== //
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets/images', express.static(path.join(__dirname, 'assets/images')));

// ====== Webhook (must come before body parser) ====== //
const webhookRoutes = require('./payment/webhookRoutes');
app.use('/webhook', webhookRoutes);

// ====== Route Imports ====== //
const signupRoutes = require('./signup/signupRoutes');
const loginRoutes = require('./login/loginRoutes');
const forgotRoutes = require('./forgot/forgotRoutes');
const uploadRoutes = require('./uploadvideo/uploadRoutes');
const imageRoutes = require('./image/imageRoutes');
const paymentRoutes = require('./payment/paymentRoutes');
const adminRoutes = require('./admin/adminRoutes');

// ====== Apply Routes ====== //
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/forgot', forgotRoutes);
app.use('/videos', uploadRoutes);
app.use('/api/images', imageRoutes);
app.use('/payment', paymentRoutes);
app.use('/admin', adminRoutes);

// ====== Logging Middleware ====== //
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ====== Log JSON Responses ====== //
app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    console.log('Response data:', data);
    oldJson.call(this, data);
  };
  next();
});

// ====== Timing Logs ====== //
app.use((req, res, next) => {
  req._startTime = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - req._startTime;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// ====== MySQL Pool Setup ====== //
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// ====== API: Get All Image Paths ====== //
app.get('/api/images', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT path FROM images');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images', error: err.message });
  }
});

// ====== Get Public IP ====== //
app.get('/my-ip', async (req, res) => {
  try {
    const ip = await axios.get('https://ipinfo.io/ip');
    res.send(`Outbound IP is: ${ip.data}`);
  } catch (err) {
    res.status(500).send('Error getting IP');
  }
});

// ====== Video Streaming Endpoint ====== //
app.get('/stream/:language/:level/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', 'videos', filename);

  try {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const file = fs.createReadStream(filePath, { start, end });
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, headers);
      file.pipe(res);
    } else {
      const headers = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Video not found' });
  }
});

// ====== Root Route ====== //
app.get('/', (req, res) => {
  res.send('Railway server is active and Permissions-Policy is set.');
});

// ====== Global Error Handler ====== //
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// ====== Start Server ====== //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
