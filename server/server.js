const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

const products = [
  {
    "_id": "68e2da3478535d896090ba3d",
    "name": "boAt Soundbar Speaker",
    "price": 3.60,
    "imageUrl": "https://m.media-amazon.com/images/I/61lC-uC+MSL._SX679_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba3e",
    "name": "Samsung Galaxy S24 Ultra",
    "price": 15.60,
    "imageUrl": "https://m.media-amazon.com/images/I/717Q2swzhBL._SX679_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba3f",
    "name": "Karsaer Sunglasses",
    "price": 0.30,
    "imageUrl": "https://m.media-amazon.com/images/I/61JRgthnRfL._SX679_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba40",
    "name": "KLOSIA Anarkali Kurta Set",
    "price": 0.60,
    "imageUrl": "https://m.media-amazon.com/images/I/81hxNald3pL._SX679_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba41",
    "name": "Safari Trolley Bags Set",
    "price": 2.40,
    "imageUrl": "https://m.media-amazon.com/images/I/61wU7VJsTbL._SX679_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba42",
    "name": "Art Street Wall Art",
    "price": 0.48,
    "imageUrl": "https://m.media-amazon.com/images/I/51zIIoeD6tL._SL1000_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba43",
    "name": "Romantic Couple Showpiece",
    "price": 0.24,
    "imageUrl": "https://m.media-amazon.com/images/I/61qJD+JDd7L._SL1500_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba44",
    "name": "Sleepyhead L Shape Sofa",
    "price": 10.80,
    "imageUrl": "https://m.media-amazon.com/images/I/61HO94EEkmL._SL1000_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba45",
    "name": "Dining Chair Covers",
    "price": 0.36,
    "imageUrl": "https://m.media-amazon.com/images/I/81WzPXUJmgL._SL1500_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba46",
    "name": "Amazon Echo Pop with Smart Bulb",
    "price": 0.96,
    "imageUrl": "https://m.media-amazon.com/images/I/61xBQ+GHWlL._SL1000_.jpg"
  },
  {
    "_id": "68e2da3578535d896090ba47",
    "name": "Wireless Headphones",
    "price": 1.20,
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba48",
    "name": "Smartphone",
    "price": 8.40,
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba49",
    "name": "Laptop",
    "price": 15.60,
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba4a",
    "name": "Coffee Maker",
    "price": 0.96,
    "imageUrl": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba4b",
    "name": "Running Shoes",
    "price": 1.56,
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba4c",
    "name": "Bluetooth Speaker",
    "price": 0.72,
    "imageUrl": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba4d",
    "name": "Smart Watch",
    "price": 3.00,
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba4e",
    "name": "Tablet",
    "price": 4.80,
    "imageUrl": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba4f",
    "name": "Gaming Mouse",
    "price": 0.60,
    "imageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba50",
    "name": "Mechanical Keyboard",
    "price": 1.08,
    "imageUrl": "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba51",
    "name": "Monitor",
    "price": 3.60,
    "imageUrl": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba52",
    "name": "Desk Lamp",
    "price": 0.48,
    "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba53",
    "name": "Water Bottle",
    "price": 0.24,
    "imageUrl": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba54",
    "name": "Backpack",
    "price": 0.96,
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba55",
    "name": "Camera",
    "price": 10.80,
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba56",
    "name": "Sunglasses",
    "price": 1.80,
    "imageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba57",
    "name": "Fitness Tracker",
    "price": 0.96,
    "imageUrl": "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba58",
    "name": "Power Bank",
    "price": 0.36,
    "imageUrl": "https://images.unsplash.com/photo-1609592808891-4f8a3d1f9e2f?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba59",
    "name": "USB Cable",
    "price": 0.12,
    "imageUrl": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba5a",
    "name": "Phone Case",
    "price": 0.30,
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba5b",
    "name": "Mouse Pad",
    "price": 0.18,
    "imageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba5c",
    "name": "Webcam",
    "price": 1.08,
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba5d",
    "name": "Microphone",
    "price": 1.44,
    "imageUrl": "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba5e",
    "name": "Desk Chair",
    "price": 2.40,
    "imageUrl": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba5f",
    "name": "Standing Desk",
    "price": 4.80,
    "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba60",
    "name": "Plant Pot",
    "price": 0.24,
    "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba61",
    "name": "Notebook",
    "price": 0.16,
    "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba62",
    "name": "Pen Set",
    "price": 0.11,
    "imageUrl": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba63",
    "name": "Stapler",
    "price": 0.19,
    "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba64",
    "name": "Highlighters",
    "price": 0.08,
    "imageUrl": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba65",
    "name": "Paper Clips",
    "price": 0.05,
    "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba66",
    "name": "Whiteboard",
    "price": 0.55,
    "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba67",
    "name": "Markers",
    "price": 0.14,
    "imageUrl": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba68",
    "name": "Sticky Notes",
    "price": 0.10,
    "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba69",
    "name": "Binder",
    "price": 0.16,
    "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba6a",
    "name": "Calculator",
    "price": 0.24,
    "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300"
  },
  {
    "_id": "68e2da3578535d896090ba6b",
    "name": "Ruler",
    "price": 0.06,
    "imageUrl": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300"
  }
];

let cart = [];
let orders = [];
let orderId = 1;

app.get('/api/products', (req, res) => {
  console.log('📋 Returning products list');
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p._id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

app.get('/api/cart', (req, res) => {
  const enrichedCart = cart.map(item => {
    const product = products.find(p => p._id === item.productId);
    return {
      ...item,
      product: product || null
    };
  });
  res.json(enrichedCart);
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p._id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ 
      id: Date.now(),
      productId, 
      quantity, 
      addedAt: new Date() 
    });
  }
  
  res.json(cart);
});

app.put('/api/cart/:id', (req, res) => {
  const { quantity } = req.body;
  const item = cart.find(item => item.id === parseInt(req.params.id));
  
  if (item) {
    if (quantity <= 0) {
      cart = cart.filter(item => item.id !== parseInt(req.params.id));
    } else {
      item.quantity = quantity;
    }
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Item not found in cart' });
  }
});

app.delete('/api/cart/:id', (req, res) => {
  cart = cart.filter(item => item.id !== parseInt(req.params.id));
  res.json(cart);
});

app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json(cart);
});

app.post('/api/checkout', (req, res) => {
  const { items, customerInfo = {} } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ 
      success: false,
      error: 'No items in cart' 
    });
  }
  
  const total = items.reduce((sum, item) => {
    const product = products.find(p => p._id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  
  const newOrder = {
    id: orderId++,
    items: items.map(item => {
      const product = products.find(p => p._id === item.productId);
      return {
        ...item,
        name: product ? product.name : 'Unknown Product',
        price: product ? product.price : 0,
        imageUrl: product ? product.imageUrl : ''
      };
    }),
    total: parseFloat(total.toFixed(2)),
    customerInfo,
    status: 'completed',
    createdAt: new Date(),
    orderNumber: `ORD-${Date.now()}`
  };
  
  orders.push(newOrder);
  cart = [];
  
  console.log('✅ Checkout successful! Order details:', {
    orderId: newOrder.id,
    itemsCount: newOrder.items.length,
    total: `$${newOrder.total}`,
    customer: customerInfo.name || 'Anonymous'
  });
  
  res.status(201).json({
    success: true,
    order: newOrder,
    message: 'Order placed successfully!'
  });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Simple Shopping Cart API is running', 
    status: 'OK',
    products: products.length,
    cartItems: cart.length,
    orders: orders.length
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Simple Shopping Cart API',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart', 
      orders: '/api/orders',
      checkout: '/api/checkout',
      health: '/api/health'
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
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple Shopping Cart Server running on http://localhost:${PORT}`);
});