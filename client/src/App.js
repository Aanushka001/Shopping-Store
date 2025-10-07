import { useState, useEffect } from "react";
import ProductGrid from "./components/ProductGrid";
import CartModal from "./components/CartModal";
import "./index.css";

// const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const API_URL = "https://shopping-store-d600.onrender.com";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "home", name: "Home & Living" },
    { id: "office", name: "Office" },
    { id: "travel", name: "Travel" }
  ];

  const getProductCategory = (product) => {
    const electronicsKeywords = [
      "phone","speaker","headphone","laptop","tablet",
      "watch","camera","echo","galaxy","smart"
    ];
    const fashionKeywords = ["sunglasses","kurta","shoes","backpack"];
    const homeKeywords = ["sofa","chair","showpiece","wall art","lamp","plant","dining"];
    const officeKeywords = [
      "notebook","pen","stapler","highlighter","paper clip",
      "whiteboard","marker","binder","calculator","ruler"
    ];
    const travelKeywords = ["bag","backpack","trolley"];

    const name = product.name.toLowerCase();
    if (electronicsKeywords.some(k => name.includes(k))) return "electronics";
    if (fashionKeywords.some(k => name.includes(k))) return "fashion";
    if (homeKeywords.some(k => name.includes(k))) return "home";
    if (officeKeywords.some(k => name.includes(k))) return "office";
    if (travelKeywords.some(k => name.includes(k))) return "travel";
    return "other";
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Unable to load products. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => getProductCategory(p) === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQty) => {
    const qty = parseInt(newQty);
    if (isNaN(qty) || qty < 0) return;
    if (qty === 0) return removeFromCart(productId);
    setCart(prev => prev.map(item => item._id === productId ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (productId) =>
    setCart(prev => prev.filter(item => item._id !== productId));

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setCheckoutStatus("error");
      setTimeout(() => setCheckoutStatus(null), 2000);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart.map(i => ({ productId: i._id, quantity: i.quantity })) })
      });
      const data = await res.json();
      setCheckoutStatus(data.success ? "success" : "error");
      if (data.success) setCart([]);
    } catch (e) {
      setCheckoutStatus("error");
    }
    setTimeout(() => { setCheckoutStatus(null); setShowCart(false); }, 2000);
  };

  const clearFilters = () => setSelectedCategory("all");

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error} <button onClick={fetchProducts}>Retry</button></div>;

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navContainer">
          <div className="navBrand">
            <div className="logo">🛍️</div>
            <h1 className="brandName">ShopEase</h1>
          </div>
          <div className="navActions">
            <button className="cartButton" onClick={() => setShowCart(true)}>
              🛒 Cart {getTotalItems() > 0 && <span className="cartBadge">{getTotalItems()}</span>}
            </button>
          </div>
        </div>
      </nav>
      <main className="mainContent">
        <div className="categoryFilters">
          <h3>Shop by Category</h3>
          {selectedCategory !== "all" && <button onClick={clearFilters}>Clear Filters</button>}
          <div className="categoryButtons">
            {categories.map(c => (
              <button
                key={c.id}
                className={`categoryButton ${selectedCategory===c.id?"active":""}`}
                onClick={() => setSelectedCategory(c.id)}
              >{c.name}</button>
            ))}
          </div>
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
