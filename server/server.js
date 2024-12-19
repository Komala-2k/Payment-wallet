const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/digital-wallet';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

// User routes
app.get('/api/users/balance', (req, res) => {
  res.json({ balance: 1000.00 });
});

// Transaction routes
app.get('/api/transactions', (req, res) => {
  res.json([
    { id: 1, type: 'credit', amount: 500, date: new Date() },
    { id: 2, type: 'debit', amount: 200, date: new Date() }
  ]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
