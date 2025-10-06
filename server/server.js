const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const productsFilePath = path.join(__dirname, 'products.json');

let products = [];
let orderCounter = 1;

try {
  const productsData = fs.readFileSync(productsFilePath, 'utf8');
  const jsonData = JSON.parse(productsData);
  products = jsonData.products;
} catch (error) {
  console.error(' Error loading products :', error);
  products = [];
}

app.get('/', (req, res) => {
  console.log(' Running!! Returning products list');
  res.json(products);
});
app.get('/api/products', (req, res) => {
  console.log(' Returning products list');
  res.json(products);
});

app.post('/api/checkout', (req, res) => {
  const { items } = req.body; 
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ 
      success: false,
      error: 'No items provided for checkout' 
    });
  }

  const enrichedItems = items.map(item => {
    const product = products.find(p => p._id === item.productId);
    return {
      productId: item.productId,
      quantity: item.quantity,
      name: product ? product.name : 'Product not found',
      price: product ? product.price : 0,
      imageUrl: product ? product.imageUrl : ''
    };
  });

  const total = enrichedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const order = {
    orderId: orderCounter++,
    items: enrichedItems,
    total: parseFloat(total.toFixed(2)),
    createdAt: new Date()
  };

  console.log('Checkout successful! Order details:', order);

  res.json({
    success: true,
    message: 'Order processed successfully',
    order: order
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    productsCount: products.length
  });
});

app.listen(PORT, () => {
  console.log(`Simple Shopping Cart Server running on http://localhost:${PORT}`);
  console.log(`Products loaded: ${products.length} items`);
});