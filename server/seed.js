const mongoose = require('mongoose');
const Product = require('./models/Product');
const config = require('./config');

const sampleProducts = [
  {
    name: 'boAt Soundbar Speaker',
    description: '500W Signature Sound, 5.1CH, Wall Mountable Design with Remote Control',
    price: 299.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61lC-uC+MSL._SX679_.jpg',
    category: 'Electronics'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'AI Smartphone with 200MP Camera, Snapdragon 8 Gen 3, 5000mAh Battery',
    price: 1299.99,
    imageUrl: 'https://m.media-amazon.com/images/I/717Q2swzhBL._SX679_.jpg',
    category: 'Electronics'
  },
  {
    name: 'Karsaer Sunglasses',
    description: '2 Pack Stylish Round Sun Glasses for Women and Men',
    price: 24.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61JRgthnRfL._SX679_.jpg',
    category: 'Fashion'
  },
  {
    name: 'KLOSIA Anarkali Kurta Set',
    description: 'Women\'s Rayon Printed Kurta and Pant with Dupatta',
    price: 49.99,
    imageUrl: 'https://m.media-amazon.com/images/I/81hxNald3pL._SX679_.jpg',
    category: 'Fashion'
  },
  {
    name: 'Safari Trolley Bags Set',
    description: '3-Piece Hard Case Luggage with 360º Wheels for Travel',
    price: 199.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61wU7VJsTbL._SX679_.jpg',
    category: 'Travel'
  },
  {
    name: 'Art Street Wall Art',
    description: 'Boho Abstract Botanical Leaf Paintings for Home Decor',
    price: 39.99,
    imageUrl: 'https://m.media-amazon.com/images/I/51zIIoeD6tL._SL1000_.jpg',
    category: 'Home Decor'
  },
  {
    name: 'Romantic Couple Showpiece',
    description: 'Hanging Legs Decorative Art for Home Interior',
    price: 19.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61qJD+JDd7L._SL1500_.jpg',
    category: 'Home Decor'
  },
  {
    name: 'Sleepyhead L Shape Sofa',
    description: '4 Seater Interchangeable Fabric Sofa Set in Stone Grey',
    price: 899.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61HO94EEkmL._SL1000_.jpg',
    category: 'Furniture'
  },
  {
    name: 'Dining Chair Covers',
    description: 'Waterproof PVC Chair and Table Covers for Kitchen',
    price: 29.99,
    imageUrl: 'https://m.media-amazon.com/images/I/81WzPXUJmgL._SL1500_.jpg',
    category: 'Home'
  },
  {
    name: 'Amazon Echo Pop with Smart Bulb',
    description: 'Smart Speaker with Alexa and Color Changing LED Bulb',
    price: 79.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61xBQ+GHWlL._SL1000_.jpg',
    category: 'Smart Home'
  },
  {
    name: 'Wireless Headphones',
    description: 'Premium sound quality with noise cancellation and long battery life',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    category: 'Electronics'
  },
  {
    name: 'Smartphone',
    description: 'Latest model with high-resolution display and advanced camera system',
    price: 699.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    category: 'Electronics'
  },
  {
    name: 'Laptop',
    description: 'High-performance laptop for work and entertainment',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300',
    category: 'Electronics'
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable athletic shoes for running and sports',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    category: 'Sports'
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with rich sound quality',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300',
    category: 'Electronics'
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking and smart notifications on your wrist',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    category: 'Electronics'
  },
  {
    name: 'Tablet',
    description: 'Versatile tablet for work, entertainment, and creativity',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300',
    category: 'Electronics'
  },
  {
    name: 'Gaming Mouse',
    description: 'Precision gaming mouse with customizable buttons',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300',
    category: 'Electronics'
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Tactile mechanical keyboard for typing and gaming',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300',
    category: 'Electronics'
  },
  {
    name: 'Monitor',
    description: 'High-resolution display for work and entertainment',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300',
    category: 'Electronics'
  },
  {
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp for optimal lighting',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    category: 'Home Office'
  },
  {
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle keeps drinks cold',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300',
    category: 'Sports'
  },
  {
    name: 'Backpack',
    description: 'Durable backpack with multiple compartments for daily use',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
    category: 'Travel'
  },
  {
    name: 'Camera',
    description: 'Professional camera with advanced photography features',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300',
    category: 'Electronics'
  },
  {
    name: 'Sunglasses',
    description: 'Stylish UV protection sunglasses for outdoor activities',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300',
    category: 'Fashion'
  },
  {
    name: 'Fitness Tracker',
    description: 'Activity tracker with heart rate monitoring and sleep tracking',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=300',
    category: 'Sports'
  },
  {
    name: 'USB Cable',
    description: 'Durable charging and data transfer cable',
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300',
    category: 'Electronics'
  },
  {
    name: 'Phone Case',
    description: 'Protective case for smartphones with stylish design',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    category: 'Electronics'
  },
  {
    name: 'Mouse Pad',
    description: 'Smooth surface gaming mouse pad with wrist support',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300',
    category: 'Electronics'
  },
  {
    name: 'Webcam',
    description: 'HD webcam for video calls and streaming',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300',
    category: 'Electronics'
  },
  {
    name: 'Microphone',
    description: 'Studio-quality microphone for recording and streaming',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300',
    category: 'Electronics'
  },
  {
    name: 'Desk Chair',
    description: 'Ergonomic office chair with lumbar support',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
    category: 'Furniture'
  },
  {
    name: 'Standing Desk',
    description: 'Adjustable height standing desk for home office',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
    category: 'Furniture'
  },
  {
    name: 'Plant Pot',
    description: 'Decorative ceramic plant pot for indoor plants',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300',
    category: 'Home Decor'
  },
  {
    name: 'Notebook',
    description: 'Premium quality notebook for writing and sketching',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
    category: 'Stationery'
  },
  {
    name: 'Pen Set',
    description: 'Collection of fine writing pens in various colors',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300',
    category: 'Stationery'
  },
  {
    name: 'Stapler',
    description: 'Heavy-duty stapler for office and home use',
    price: 15.99,
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
    category: 'Stationery'
  },
  {
    name: 'Highlighters',
    description: 'Set of vibrant highlighters for study and work',
    price: 6.99,
    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300',
    category: 'Stationery'
  },
  {
    name: 'Paper Clips',
    description: 'Box of assorted paper clips for organization',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
    category: 'Stationery'
  },
  {
    name: 'Whiteboard',
    description: 'Magnetic whiteboard for presentations and notes',
    price: 45.99,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
    category: 'Office'
  },
  {
    name: 'Markers',
    description: 'Set of dry-erase markers for whiteboards',
    price: 11.99,
    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300',
    category: 'Stationery'
  },
  {
    name: 'Sticky Notes',
    description: 'Colorful sticky notes for reminders and notes',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
    category: 'Stationery'
  },
  {
    name: 'Binder',
    description: 'Durable binder for organizing documents and papers',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
    category: 'Stationery'
  },
  {
    name: 'Calculator',
    description: 'Scientific calculator for students and professionals',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
    category: 'Electronics'
  },
  {
    name: 'Ruler',
    description: 'Precision ruler for measurements and drawing',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300',
    category: 'Stationery'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log('Seeded database with sample products');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();