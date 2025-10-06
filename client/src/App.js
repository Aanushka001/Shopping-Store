import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'office', name: 'Office' },
    { id: 'travel', name: 'Travel' }
  ];

  const getProductCategory = (product) => {
    const electronicsKeywords = ['phone', 'speaker', 'headphone', 'laptop', 'tablet', 'watch', 'camera', 'echo', 'galaxy', 'smart'];
    const fashionKeywords = ['sunglasses', 'kurta', 'shoes', 'backpack'];
    const homeKeywords = ['sofa', 'chair', 'showpiece', 'wall art', 'lamp', 'plant', 'dining'];
    const officeKeywords = ['notebook', 'pen', 'stapler', 'highlighter', 'paper clip', 'whiteboard', 'marker', 'binder', 'calculator', 'ruler'];
    const travelKeywords = ['bag', 'backpack', 'trolley'];

    const name = product.name.toLowerCase();
    
    if (electronicsKeywords.some(keyword => name.includes(keyword))) return 'electronics';
    if (fashionKeywords.some(keyword => name.includes(keyword))) return 'fashion';
    if (homeKeywords.some(keyword => name.includes(keyword))) return 'home';
    if (officeKeywords.some(keyword => name.includes(keyword))) return 'office';
    if (travelKeywords.some(keyword => name.includes(keyword))) return 'travel';
    
    return 'other';
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        getProductCategory(product) === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/products`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Unable to load products. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
      
      return [...prevCart, { ...product, price, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    
    if (isNaN(quantity) || quantity < 0) {
      return;
    }
    
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setCheckoutStatus('error');
      setTimeout(() => setCheckoutStatus(null), 2000);
      return;
    }

    try {
      setCheckoutStatus('processing');

      const orderItems = cart.map(item => ({
        productId: item._id, 
        quantity: item.quantity
      }));

      const response = await fetch(`${API_BASE_URL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          items: orderItems
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      setCheckoutStatus('success');
      setCart([]);
      
      setTimeout(() => {
        setCheckoutStatus(null);
        setShowCart(false);
      }, 2000);

    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutStatus('error');
      setTimeout(() => setCheckoutStatus(null), 3000);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <button 
          onClick={fetchProducts}
          className="retryBtn"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navContainer">
          <div className="navBrand">
            <div className="logo">🛍️</div>
            <h1 className="brandName">ShopEase</h1>
          </div>
          
          <div className="navActions">
            <button 
              className="cartButton"
              onClick={() => setShowCart(true)}
            >
              <span className="cartIcon">🛒</span>
              <span className="cartText">Cart</span>
              {getTotalItems() > 0 && (
                <span className="cartBadge">{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="mainContent">
        <div className="container">
          <div className="pageHeader">
            <h2 className="pageTitle">Premium Collection</h2>
            <p className="pageSubtitle">Discover exceptional products for every need</p>
          </div>

          <div className="categoryFilters">
            <div className="filterHeader">
              <h3>Shop by Category</h3>
              {selectedCategory !== 'all' && (
                <button className="clearFilters" onClick={clearFilters}>
                  Clear All
                </button>
              )}
            </div>
            <div className="categoryButtons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`categoryButton ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="emptyState">
              <div className="emptyIcon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
              <button className="clearFiltersBtn" onClick={clearFilters}>
                Show All Products
              </button>
            </div>
          ) : (
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={addToCart}
            />
          )}
        </div>
      </main>

      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={handleCheckout}
          totalPrice={getTotalPrice()}
          checkoutStatus={checkoutStatus}
        />
      )}
    </div>
  );
}

export default App;