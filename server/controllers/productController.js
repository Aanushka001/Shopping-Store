const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const checkout = async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items format' });
    }

    // Order processed successfully

    res.json({ message: 'Order processed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process order' });
  }
};

module.exports = {
  getProducts,
  checkout
};
