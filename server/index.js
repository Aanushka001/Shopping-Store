const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Shopping Cart API is running', 
    timestamp: new Date().toISOString(),
    status: 'OK'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Shopping Store API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      auth: '/api/auth',
      users: '/api/users'
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
});