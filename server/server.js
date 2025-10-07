import express, { json } from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productsFilePath = join(__dirname, 'Products.json');


let products = [];
let orderCounter = 1;

try {
  const productsData = readFileSync(productsFilePath, 'utf8');
  const jsonData = JSON.parse(productsData);
  products = jsonData.products || [];
} catch (error) {
  console.error('Error loading products:', error);
  products = [];
}

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body || '');
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Shopping Cart API',
    endpoints: {
      '/api/products': 'GET list of products',
      '/api/products/:id': 'GET single product by ID',
      '/api/checkout': 'POST to process an order'
    }
  });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p._id == productId);
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json(product);
});

app.post('/api/checkout', (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'No items provided for checkout' });
  }

  const enrichedItems = items.map(item => {
    const product = products.find(p => p._id == item.productId);
    return {
      productId: item.productId,
      quantity: item.quantity,
      name: product ? product.name : 'Product not found',
      price: product ? product.price : 0,
      imageUrl: product ? product.imageUrl : ''
    };
  });

  const total = enrichedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    orderId: orderCounter++,
    items: enrichedItems,
    total: parseFloat(total.toFixed(2)),
    createdAt: new Date()
  };

  res.json({
    success: true,
    message: 'Order processed successfully',
    order
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Products loaded: ${products.length} items`);
});
