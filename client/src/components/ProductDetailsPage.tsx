import  { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import api from "../api"
import {  useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";
import toast from "react-hot-toast";

import {log} from '../../logger';


const ProductDetailsPage = () => {

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId=user._id

  

   const [cartItems, setCartItems] = useState([]);

  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  // const [quantity, setQuantity] = useState(1);
  const server = import.meta.env.VITE_SERVER;
  
  useEffect(() => {
    api.get(`/product/${productId}`)
      .then((res) => {
        if (res.data.success) {
          setProductDetails(res.data.data);
        } else {
          // Handle error
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error)
      });
  }, [productId]);

  log.debug("productDetails:", productDetails)

  const handleToggleFavorite = async () => {
    

    try {
    
    const userId = user._id;

    
    

     const response =  await api.post('/user/wishlist/add', {


    userId,
    productId,
    
    });

    if(response.data.success){

      // fetchingFavourites();

      toast.success("added to wishlist")

      
    }

    
    // onAddToFavorites();
    } catch (error) {
      toast.error("alrady added")
    console.error(error);
    
    }
  };






  const addToCart = (product) => {
    api
      .post(`/cart/add/${userId}`, { product, quantity: 1 })
      .then((response) => log.debug("Product added to cart:", response.data))
      .catch((error) => console.error("Error adding to cart:", error));

      const existingItem = cartItems.find(
        (item) => item.productId === product._id
      );

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // dispatch(addItemToCart(product.productName));

      setCartItems([
        ...cartItems,
        {
          productId: product._id,
          quantity: 1,
          name: product.productName,
          price: product.price,
          imageUrl: `${server}/${product.productImage[0].replace(/ /g, "%20")}`,
        },
      ]);
    }

    toast.success(`${product.productName} added to cart!`);
  };

  // const handleQuantityChange = (event) => {
  //   setQuantity(event.target.value);
  // };

  return (
    <div className="container mx-auto p-8">
      {productDetails && (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Product Images Slider */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <ImageGallery
              items={productDetails.productImage.map((image) => ({
                // original: `http://localhost:5000/${image}`,
                // thumbnail: `http://localhost:5000/${image}`,
                original: `${server}/${image}`,
                thumbnail: `${server}/${image}`,
              }))}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{productDetails.productName}</h2>
            <p className="text-gray-700 mb-4">{productDetails.description}</p>
            <p className="text-xl font-bold text-indigo-600 mb-4">₹{productDetails.price}</p>

            {/* Quantity Selection */}
            {/* <div className="mb-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 border rounded-md p-1.5 text-sm"
              />
            </div> */}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
              <button
                // onClick={handleAddToCart}
                onClick={()=>addToCart(productDetails)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
              onClick={handleToggleFavorite}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Add to Wishlist
              </button>
            </div>

            {/* Other Features */}
            <div className="flex flex-col gap-2">
              {/* Add other features here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;