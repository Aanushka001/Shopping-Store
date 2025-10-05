import React from 'react';

const ProductGrid = ({ products, onAddToCart }) => {
  const getCategory = (name) => {
    const categories = {
      'Headphones': 'Electronics',
      'Smartphone': 'Electronics',
      'Laptop': 'Electronics',
      'Coffee Maker': 'Appliances',
      'Running Shoes': 'Fashion',
      'Bluetooth Speaker': 'Electronics',
      'Smart Watch': 'Electronics',
      'Tablet': 'Electronics',
      'Gaming Mouse': 'Electronics',
      'Mechanical Keyboard': 'Electronics',
      'Monitor': 'Electronics',
      'Desk Lamp': 'Home & Office',
      'Water Bottle': 'Lifestyle',
      'Backpack': 'Fashion',
      'Camera': 'Electronics',
      'Sunglasses': 'Fashion',
      'Fitness Tracker': 'Electronics',
      'Power Bank': 'Electronics',
      'USB Cable': 'Electronics',
      'Phone Case': 'Accessories',
      'Mouse Pad': 'Accessories',
      'Webcam': 'Electronics',
      'Microphone': 'Electronics',
      'Desk Chair': 'Furniture',
      'Standing Desk': 'Furniture',
      'Plant Pot': 'Home & Garden',
      'Notebook': 'Office Supplies',
      'Pen Set': 'Office Supplies',
      'Stapler': 'Office Supplies',
      'Highlighters': 'Office Supplies',
      'Paper Clips': 'Office Supplies',
      'Whiteboard': 'Office Supplies',
      'Markers': 'Office Supplies',
      'Sticky Notes': 'Office Supplies',
      'Binder': 'Office Supplies',
      'Calculator': 'Office Supplies',
      'Ruler': 'Office Supplies'
    };
    return categories[name] || 'General';
  };

  const getDescription = (name) => {
    const descriptions = {
      'Headphones': 'Premium wireless headphones with exceptional sound quality',
      'Smartphone': 'Latest generation smartphone with advanced features',
      'Laptop': 'High-performance laptop for work and entertainment',
      'Coffee Maker': 'Professional-grade coffee maker for perfect brews',
      'Running Shoes': 'Comfortable and durable running shoes',
      'Bluetooth Speaker': 'Portable speaker with crystal clear sound',
      'Smart Watch': 'Feature-rich smartwatch for active lifestyle',
      'Tablet': 'Versatile tablet for productivity and entertainment',
      'Gaming Mouse': 'Precision gaming mouse for competitive gaming',
      'Mechanical Keyboard': 'Tactile mechanical keyboard for typing enthusiasts',
      'Monitor': 'High-resolution monitor for professional use',
      'Desk Lamp': 'Adjustable LED desk lamp with modern design',
      'Water Bottle': 'Insulated water bottle to keep drinks fresh',
      'Backpack': 'Stylish and functional backpack for daily use',
      'Camera': 'Professional camera for photography enthusiasts',
      'Sunglasses': 'Trendy sunglasses with UV protection',
      'Fitness Tracker': 'Advanced fitness tracker for health monitoring',
      'Power Bank': 'High-capacity power bank for mobile devices',
      'USB Cable': 'Fast charging USB cable for various devices',
      'Phone Case': 'Protective phone case with elegant design',
      'Mouse Pad': 'Smooth mouse pad for precise cursor control',
      'Webcam': 'HD webcam for video calls and streaming',
      'Microphone': 'Professional microphone for recording and streaming',
      'Desk Chair': 'Ergonomic desk chair for comfortable work',
      'Standing Desk': 'Adjustable standing desk for better posture',
      'Plant Pot': 'Decorative plant pot for indoor gardening',
      'Notebook': 'High-quality notebook for writing and sketching',
      'Pen Set': 'Premium pen set for writing enthusiasts',
      'Stapler': 'Heavy-duty stapler for office use',
      'Highlighters': 'Colorful highlighters for marking important text',
      'Paper Clips': 'Assorted paper clips for organizing documents',
      'Whiteboard': 'Large whiteboard for presentations and notes',
      'Markers': 'Dry erase markers for whiteboard use',
      'Sticky Notes': 'Colorful sticky notes for reminders',
      'Binder': 'Organizational binder for documents',
      'Calculator': 'Scientific calculator for complex calculations',
      'Ruler': 'Precision ruler for measurements'
    };
    return descriptions[name] || 'Quality product for your needs';
  };

  return (
    <div className="productsGrid">
      {products.map(product => (
        <div key={product._id} className="productCard">
          <div className="productImageContainer">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="productImage"
            />
            <div className="productImageOverlay"></div>
          </div>
          <div className="productInfo">
            <div className="productCategory">{getCategory(product.name)}</div>
            <h3 className="productName">{product.name}</h3>
            <p className="productDescription">{getDescription(product.name)}</p>
            <div className="productPriceContainer">
              <div>
                <div className="productPrice">₹{product.price.toFixed(0)}</div>
                <div className="productPriceLabel">Starting from</div>
              </div>
            </div>
            <button 
              className="addToCartBtn"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
