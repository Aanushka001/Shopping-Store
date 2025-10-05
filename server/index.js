const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Shopping Cart API is running' });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
