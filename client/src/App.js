import { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';
import Parse from 'parse';

Parse.initialize(process.env.REACT_APP_PARSE_APP_ID);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL;

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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await Parse.Cloud.run("getProducts");
      setProducts(results);
    } catch (err) {
      setError('Unable to load products. Please check the backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => getProductCategory(product) === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const addToCart = async (product) => {
    try {
      const cartItem = await Parse.Cloud.run("addToCart", { productId: product.id, quantity: 1, userId: "guest" });
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === cartItem.id);
        if (existingItem) {
          return prevCart.map(item => item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prevCart, { ...product, id: cartItem.id, quantity: 1 }];
      });
    } catch {}
  };

  const updateQuantity = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) return;
    if (quantity === 0) return removeFromCart(productId);
    setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId) => setCart(prevCart => prevCart.filter(item => item.id !== productId));

  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setCheckoutStatus('error');
      setTimeout(() => setCheckoutStatus(null), 2000);
      return;
    }
    setCheckoutStatus('success');
    setCart([]);
    setTimeout(() => {
      setCheckoutStatus(null);
      setShowCart(false);
    }, 2000);
  };

  const clearFilters = () => setSelectedCategory('all');

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}<button onClick={fetchProducts}>Retry</button></div>;

  return (
    <div>
      <nav>
        <h1>ShopEase</h1>
        <button onClick={() => setShowCart(true)}>
          Cart {getTotalItems() > 0 && `(${getTotalItems()})`}
        </button>
      </nav>

      <main>
        <div>
          {categories.map(c => (
            <button key={c.id} className={selectedCategory === c.id ? 'active' : ''} onClick={() => setSelectedCategory(c.id)}>
              {c.name}
            </button>
          ))}
          {selectedCategory !== 'all' && <button onClick={clearFilters}>Clear</button>}
        </div>

        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
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
