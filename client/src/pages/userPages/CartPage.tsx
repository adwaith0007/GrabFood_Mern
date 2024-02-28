import React, { useEffect, useState } from 'react';
import CartSection from './CartSection';
import OrderSummarySection from './OrderSummarySection';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../types/reducer-types';


const CartPage = () => {

    const {user} = useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer);
  
    const userId =user._id;
    
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        // Fetch products
        // axios.get('/api/products')
        //   .then(response => setProducts(response.data))
        //   .catch(error => console.error('Error fetching products:', error));
        
        // // Fetch cart items
        // axios.get('/api/cart')
        //   .then(response => setCartItems(response.data))
        //   .catch(error => console.error('Error fetching cart items:', error));
        
    
    axios.get(`http://localhost:5000/api/cart/${userId}`)
      .then(response => {
        setCartItems(response.data.cart);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });


  }, []);

  console.log(cartItems.length);
  

 const handleAddToCart = (productId, quantity) => {
    axios.post('/api/cart/add', { productId, quantity })
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error adding to cart:', error));
  };

  const handleUpdateCart = (productId, quantity) => {
    axios.post('/api/cart/update', { productId, quantity })
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error updating cart:', error));
  };

  const handleDeleteFromCart = (productId) => {
    axios.post('/api/cart/delete', { productId })
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error deleting from cart:', error));
  };

  return (
    <div className="flex">
       <CartSection
          products={cartItems}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCart={handleUpdateCart}
          onDeleteFromCart={handleDeleteFromCart}
        />
        <OrderSummarySection cartItems={cartItems} />

        
    </div>
  );
};

export default CartPage;