import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const saveCartToStorage = React.useCallback(() => {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  }, [cart]);

  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    if (cart.length > 0 || cart.length === 0) {
      saveCartToStorage();
    }
  }, [cart, saveCartToStorage]);

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

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        setCart(Array.isArray(parsed) ? parsed : []);
      }
    } catch (err) {
      console.error('Error loading cart:', err);
      localStorage.removeItem('shoppingCart');
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
      
      return [...prevCart, { ...product, quantity: 1 }];
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
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return total + itemTotal;
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
          items: orderItems,
          customerInfo: {
            name: 'Guest Customer',
            email: 'guest@example.com'
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      setCheckoutStatus('success');
      setCart([]);
      localStorage.removeItem('shoppingCart');
      
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
          style={{ marginTop: '20px', padding: '10px 20px' }}
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
            <h1 className="brandName">ShoppingStore</h1>
          </div>
          
          <div className="navActions">
            <button 
              className="cartButton"
              onClick={() => setShowCart(true)}
              aria-label="Open shopping cart"
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
            <h2 className="pageTitle">Discover Amazing Products</h2>
            <p className="pageSubtitle">Find everything you need in one place</p>
          </div>
          
          {products.length === 0 ? (
            <div className="emptyCart">No products available</div>
          ) : (
            <ProductGrid 
              products={products} 
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