import { useState, useEffect } from "react";
import ProductGrid from "./components/ProductGrid";
import CartModal from "./components/CartModal";
import "./index.css";

const API_BASE_URL = "http://localhost:5000";

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
      "phone", "speaker", "headphone", "laptop", "tablet", 
      "watch", "camera", "echo", "galaxy", "smart"
    ];
    const fashionKeywords = ["sunglasses", "kurta", "shoes", "backpack"];
    const homeKeywords = [
      "sofa", "chair", "showpiece", "wall art", "lamp", "plant", "dining"
    ];
    const officeKeywords = [
      "notebook", "pen", "stapler", "highlighter", "paper clip",
      "whiteboard", "marker", "binder", "calculator", "ruler"
    ];
    const travelKeywords = ["bag", "backpack", "trolley"];

    const name = product.name.toLowerCase();

    if (electronicsKeywords.some((keyword) => name.includes(keyword)))
      return "electronics";
    if (fashionKeywords.some((keyword) => name.includes(keyword)))
      return "fashion";
    if (homeKeywords.some((keyword) => name.includes(keyword))) return "home";
    if (officeKeywords.some((keyword) => name.includes(keyword)))
      return "office";
    if (travelKeywords.some((keyword) => name.includes(keyword)))
      return "travel";

    return "other";
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Unable to load products. Is the backend running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => getProductCategory(product) === selectedCategory
      );
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
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
    if (isNaN(quantity) || quantity < 0) return;
    if (quantity === 0) return removeFromCart(productId);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) =>
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setCheckoutStatus("error");
      setTimeout(() => setCheckoutStatus(null), 2000);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity
          }))
        })
      });

      const data = await res.json();
      if (data.success) {
        setCheckoutStatus("success");
        setCart([]);
      } else {
        setCheckoutStatus("error");
      }
    } catch (e) {
      setCheckoutStatus("error");
    }

    setTimeout(() => {
      setCheckoutStatus(null);
      setShowCart(false);
    }, 2000);
  };

  const clearFilters = () => setSelectedCategory("all");

  if (loading) return <div className="loading">Loading products...</div>;
  if (error)
    return (
      <div className="error">
        {error} <button className="retryBtn" onClick={fetchProducts}>Retry</button>
      </div>
    );

  return (
    <div className="container">
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
              Cart
              {getTotalItems() > 0 && (
                <span className="cartBadge">{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <main className="mainContent">
        <div className="pageHeader">
          <h1 className="pageTitle">Discover Amazing Products</h1>
          <p className="pageSubtitle">
            Handpicked items for every need and occasion
          </p>
        </div>

        <div className="categoryFilters">
          <div className="filterHeader">
            <h3>Shop by Category</h3>
            {selectedCategory !== "all" && (
              <button className="clearFilters" onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>
          <div className="categoryButtons">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`categoryButton ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
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