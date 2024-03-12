import React, { useEffect, useState } from "react";

import axios from "axios";
import serverUrl from "../../server";
import CategoryCards from "../../components/CategoryCards";
import ProductCard from "../../components/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "./../../redux/userSlice";

import s2_1 from "../../assets/s2_1.png";
import { useLatestProductsQuery } from "../../redux/api/productAPI";

import CartSidebar from "../../components/CartSidebar";
import AddressInput from "../../components/AddressInput";

import { useNavigate } from "react-router-dom";
import { UserReducerInitialState } from "../../types/reducer-types";

import api from '../../api';
const server = import.meta.env.VITE_SERVER;

// import AddressModal from "../../components/AddressInput";


const MenuPage = () => {
  
  
  const {user} = useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer);
  
  const userId =user._id;
  const navigate = useNavigate();

  // const {data} =useLatestProductsQuery("")

  // const userData = useSelector(selectUser);

  // console.log(userData);

  const [categoryList, setCategoryList] = useState([]);

  const [productList, setProductList] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [userAddress, setUserAddress] = useState({});

  const [showAddressModal, setShowAddressModal] = useState(false);

  // console.log("showAddressModal:", showAddressModal);
  useEffect(() => {
    try {
      api.get(`/category/get`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error white while loading categories");
      console.log(error);
    }

    try {
      api.get(`/product/get`).then((res) => {
        if (res.data.success) {
          setProductList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error white while loading products");
      console.log(error);
    }
  }, []);

  const addToCart = (product) => {
    
   
    

    api.post(`/cart/add/${userId}`, { product, quantity:1 })
    .then(response => console.log('Product added to cart:', response.data))
    .catch(error => console.error('Error adding to cart:', error));


    const existingItem = cartItems.find(
      (item) => item.productId === product._id
    );

    if (existingItem) {
      // If the product is already in the cart, increase its quantity
      const updatedCart = cartItems.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1 and other details
      setCartItems([
        ...cartItems,
        {
          productId: product._id,
          quantity: 1,
          name: product.productName,
          price: product.price,
          imageUrl: `${server}/${product.productImage[0].replace(
            / /g,
            "%20"
          )}`,
        },
      ]);
    }

    toast.success(`${product.productName} added to cart!`);
  };

  const changeCategory = () => {
    console.log("cart");
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCart);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleProceedToPayment = () => {
    console.log("Handling Proceed to Payment...");

    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Add items before proceeding to payment."
      );
      return;
    }

    if (
      !userAddress ||
      !userAddress.street ||
      !userAddress.city ||
      !userAddress.state ||
      !userAddress.zipCode
    ) {
      // Open the address input modal if the address is not complete

      setShowAddressModal(true);

      return;
    }

    console.log("Proceeding to payment!");
    console.log("Cart Items:", cartItems);
    console.log("User Address:", userAddress);

    // Add logic to handle the actual payment process here

    const userId = "65913f07581f920ea7c196cf"; // Replace with actual userId (e.g., from user authentication)

    // Pass the userId to the AddressInput component
    setShowAddressModal(true);
    setUserAddress({}); // Clear the userAddress state
    navigate(`/address/${userId}`);
  };

  return (
    <div className="bg-[#e5d9ca] h-full ">
      <div className="container custom-height flex flex-col justify-center items-center mx-auto  ">
        <div className="flex gap-4">
          {categoryList.map((item) => (
            <div key={item._id}>
              {item.categoryImage && item.categoryImage[0] && (
                <>
                  <CategoryCards
                    name={item.category}
                    imageUrl={`${server}/${item.categoryImage[0].replace(/ /g,"%20" )}`}
                    handler={changeCategory}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {productList.map((item) => (
            <div key={item._id}>
              {item.productImage && item.productImage[0] && (
                <>
                  <ProductCard
                    productId={item._id}
                    price={item.price}
                    description={item.Description}
                    name={item.productName}
                    imageUrl={`${server}/${item.productImage[0].replace(/ /g,"%20" )}`}
                    onAddToCart={() => addToCart(item)} // Pass the addToCart callback to ProductCard
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* {cartItems.length > 0 && (
          <CartSidebar
            cartItems={cartItems}
            closeCart={() => setCartItems([])}
            onRemove={(productId) => handleRemoveFromCart(productId)}
            onIncrease={(productId) => handleIncreaseQuantity(productId)}
            onDecrease={(productId) => handleDecreaseQuantity(productId)}
            // onProceedToPayment={() => handleProceedToPayment()}
            handleProceedToPayment={() => handleProceedToPayment()}
          />
        )} */}

        {/* AddressModal component */}
        {/* {showAddressModal && (
          <AddressInput
            userId="65913f07581f920ea7c196cf"
            setAddress={setUserAddress}
            onClose={() => setShowAddressModal(false)}
          />
        )} */}

        
      </div>
    </div>
  );
};

export default MenuPage;
