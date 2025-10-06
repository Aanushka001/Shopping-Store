import React from 'react';

const ProductGrid = ({ products, onAddToCart }) => {
  const getCategory = (name) => {
    const categories = {
      'boAt Soundbar Speaker': 'Electronics',
      'Samsung Galaxy S24 Ultra': 'Electronics',
      'Amazon Echo Pop with Smart Bulb': 'Electronics',
      'Wireless Headphones': 'Electronics',
      'Smartphone': 'Electronics',
      'Laptop': 'Electronics',
      'Bluetooth Speaker': 'Electronics',
      'Smart Watch': 'Electronics',
      'Tablet': 'Electronics',
      'Gaming Mouse': 'Electronics',
      'Mechanical Keyboard': 'Electronics',
      'Monitor': 'Electronics',
      'Camera': 'Electronics',
      'Fitness Tracker': 'Electronics',
      'Power Bank': 'Electronics',
      'USB Cable': 'Electronics',
      'Webcam': 'Electronics',
      'Microphone': 'Electronics',
      'Calculator': 'Electronics',
      
      'Karsaer Sunglasses': 'Fashion',
      'KLOSIA Anarkali Kurta Set': 'Fashion',
      'Running Shoes': 'Fashion',
      'Sunglasses': 'Fashion',
      'Backpack': 'Fashion',
      
      'Sleepyhead L Shape Sofa': 'Home & Living',
      'Dining Chair Covers': 'Home & Living',
      'Desk Lamp': 'Home & Living',
      'Desk Chair': 'Home & Living',
      'Standing Desk': 'Home & Living',
      'Plant Pot': 'Home & Living',
      
      'Notebook': 'Office Supplies',
      'Pen Set': 'Office Supplies',
      'Stapler': 'Office Supplies',
      'Highlighters': 'Office Supplies',
      'Paper Clips': 'Office Supplies',
      'Whiteboard': 'Office Supplies',
      'Markers': 'Office Supplies',
      'Sticky Notes': 'Office Supplies',
      'Binder': 'Office Supplies',
      'Ruler': 'Office Supplies',
  
      'Safari Trolley Bags Set': 'Travel',

      'Art Street Wall Art': 'Home Decor',
      'Romantic Couple Showpiece': 'Home Decor'
    };
    return categories[name] || 'General';
  };

  const getDescription = (name) => {
    const descriptions = {
      'Romantic Couple Showpiece': 'Beautiful decorative piece for your home',
      'Sleepyhead L Shape Sofa': 'Comfortable and stylish L-shaped sofa',
      'Dining Chair Covers': 'Elegant covers to protect and enhance your dining chairs',
      'boAt Soundbar Speaker': 'Premium soundbar with immersive audio experience',
      'Samsung Galaxy S24 Ultra': 'Flagship smartphone with advanced AI features',
      'Karsaer Sunglasses': 'Stylish sunglasses with UV protection',
      'KLOSIA Anarkali Kurta Set': 'Elegant traditional Indian wear',
      'Safari Trolley Bags Set': 'Durable luggage set for travel',
      'Art Street Wall Art': 'Decorative wall art to enhance your space',
      'Amazon Echo Pop with Smart Bulb': 'Smart home assistant with lighting'
    };
    return descriptions[name] || 'Quality product for your needs';
  };

  return (
    <div className="productsGrid">
      {products.map(product => {
        // Ensure price is a valid number
        const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
        
        return (
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
                  <div className="productPrice">₹{Math.round(price)}</div>
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
        );
      })}
    </div>
  );
};

export default ProductGrid;