import React from 'react';

const CartModal = ({ 
  cart, 
  onClose, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onCheckout, 
  totalPrice,
  checkoutStatus 
}) => {
  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity) || 0;
    onUpdateQuantity(productId, quantity);
  };

  return (
    <div className="cartModal" onClick={onClose}>
      <div className="cartContent" onClick={e => e.stopPropagation()}>
        <div className="cartHeader">
          <h2 className="cartTitle">Shopping Cart</h2>
          <button className="closeBtn" onClick={onClose}>×</button>
        </div>

        {checkoutStatus === 'success' && (
          <div className="success">
            Order placed successfully! Thank you for your purchase.
          </div>
        )}

        {checkoutStatus === 'error' && (
          <div className="error">
            Failed to place order. Please try again.
          </div>
        )}

        {cart.length === 0 ? (
          <div className="emptyCart">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="cartItems">
              {cart.map(item => (
                <div key={item._id} className="cartItem">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="itemImage"
                  />
                  <div className="itemDetails">
                    <div className="itemName">{item.name}</div>
                    <div className="itemPrice">₹{item.price.toFixed(0)}</div>
                  </div>
                  <div className="quantityControls">
                    <button 
                      className="quantityBtn"
                      onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantityInput"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      min="0"
                    />
                    <button 
                      className="quantityBtn"
                      onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="removeBtn"
                    onClick={() => onRemoveFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cartTotal">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(0)}</span>
            </div>

            <button 
              className="checkoutBtn"
              onClick={onCheckout}
              disabled={checkoutStatus === 'success'}
            >
              {checkoutStatus === 'success' ? 'Order Placed!' : 'Checkout'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
