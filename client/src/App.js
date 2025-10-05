import React, { useState, useEffect, useCallback } from 'react';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const saveCartToStorage = useCallback(() => {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error saving cart to storage:', err);
    }
  }, [cart]);

  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    saveCartToStorage();
  }, [saveCartToStorage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error('Error loading cart from storage:', err);
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
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    try {
      const orderItems = cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: orderItems }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      setCheckoutStatus('success');
      setCart([]);
      
      setTimeout(() => {
        setCheckoutStatus(null);
        setShowCart(false);
      }, 2000);
    } catch (err) {
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
        <div className="error">Error: {error}</div>
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
            >
              <span className="cartIcon">🛒</span>
              <span className="cartText">Cart</span>
              {getTotalItems() > 0 && (
                <span className="cartBadge">{getTotalItems()}</span>
              )}
            </button>
            
            <button className="profileButton">
              <span className="profileIcon">👤</span>
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
          
          <ProductGrid 
            products={products} 
            onAddToCart={addToCart}
          />
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
