const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectdb');
const apiRoutes = require('./routes');

// ============================================================
// INITIALIZATION
// ============================================================
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// MIDDLEWARE
// ============================================================
// Allow CORS from configured frontend URL (or allow all if not set)
const FRONTEND_URL = process.env.FRONTEND_URL || '*';
app.use(
  cors({
    origin: FRONTEND_URL === '*' ? true : FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// CONNECT TO DATABASE
// ============================================================
connectDB();

// ============================================================
// ROUTES
// ============================================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CarbonChain Pro Server is Running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api', apiRoutes);

// Welcome endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CarbonChain Pro API',
    version: '1.0.0',
    description: 'AI-Powered Supply Chain Carbon & Net-Zero Tracker',
  });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: MongoDB`);
  console.log(`🌱 CarbonChain Pro - AI-Powered Supply Chain Carbon & Net-Zero Tracker`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
});

module.exports = app;
