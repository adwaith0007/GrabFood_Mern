import React, { useEffect, useState } from 'react';
import CartSection from './CartSection';
import OrderSummarySection from './OrderSummarySection';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the server
    // You can use axios or fetch for making API requests
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const handleAddToCart = (productId, quantity) => {
    // Make a POST request to add items to the cart
    fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    })
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error adding to cart:', error));
  };

  // Similar functions for update and delete

  return (
    <div className="flex">
      <CartSection cartItems={cartItems} onAddToCart={handleAddToCart} />
      <OrderSummarySection cartItems={cartItems} />
    </div>
  );
};

export default CartPage;