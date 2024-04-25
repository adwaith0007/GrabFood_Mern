// import serverUrl from "../server";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


import api from "../api";

import { useSelector } from "react-redux";

import { UserReducerInitialState } from "../types/reducer-types";

type ProductCardProps = {
  productId: string;
  name: string;
  imageUrl: string;
  discountPrice:number;
  offerInPercentage:number;
  description: string;
  price: number;
  onAddToCart: () => void;
  // onAddToFavorites: () => void;
};

const ProductCard = ({
  productId,
  price,
  name,
  discountPrice,
  
offerInPercentage,
  description,
  imageUrl,
  onAddToCart,
  // onAddToFavorites,
}: ProductCardProps) => {
  

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const userId = user._id;

 

  const [userFavourites, setUserFavourites] = useState([]);

  

  const fetchingFavourites = async () => {
    try {
      const response = await api.get(`/user/${userId}/wishlist` );
      if (response.data.success) {
        setUserFavourites(response.data.data);
      } else {
        console.error("Failed to fetch user orders:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  console.log('data:',userFavourites);
  

 

  useEffect(() => {
    fetchingFavourites();
  }, [userId]);

  const handleToggleFavorite = async () => {
    

    try {
    
    const userId = user._id;

    
    

     const response =  await api.post('/user/wishlist/add', {


    userId,
    productId,
    
    });

    if(response.data.success){

      fetchingFavourites();

      
    }

    
    // onAddToFavorites();
    } catch (error) {
    console.error(error);
    
    }
  };

 

  return (
    <div className="relative m-10 flex w-full max-w-xs  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        to={`/product/${productId}`}
      >
        <img className="object-cover" src={imageUrl} alt="product image" />

        {offerInPercentage &&(

          
          
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          

          {offerInPercentage}% OFF
        </span>
            )
        }
      </Link>

      <button
        onClick={handleToggleFavorite}
        className=" absolute z-10 top-0 right-0 mt-4 mr-6 rounded-full bg-black px-2 border focus:outline-none"
      >
        {/* <FontAwesomeIcon icon={faHeart} color={isFavorite ? "red" : "white"} /> */}

        {/* <FontAwesomeIcon icon={faHeart} color={  userFavourites.some((item)=>item.productId == productId  ) ? "red" : "white"} /> */}

        <FontAwesomeIcon
  icon={faHeart}
  color={userFavourites.some((item) => item.productId === productId) ? "red" : "white"}
/>

      </button>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1 ">{name}</h5>
        </a>
        <div className="mt-2 mb-2 flex items-center justify-between">

          {discountPrice ? 
          <p>
          <span className="text-3xl font-bold text-slate-900">₹{discountPrice}</span>
          <span className="text-sm text-slate-900 line-through">₹{price}</span>
        </p> 
        :
        <p>
            <span className="text-3xl font-bold text-slate-900">₹{price}</span>
            {/* <span className="text-sm text-slate-900 line-through">₹{price}</span> */}
          </p>

          }
   

         
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
        </div>

        <div className="px-4 mb-4 overflow-hidden h-10 ">
        <p className="text-sm text-slate-900 line-clamp-2">{description}</p>
      </div>

        <button
          onClick={onAddToCart}
          className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>

      {/* <img className="object-cover" src={`${serverUrl}/${imageUrl}`} alt="product image"/> */}
    </div>
  );
};

export default ProductCard;
