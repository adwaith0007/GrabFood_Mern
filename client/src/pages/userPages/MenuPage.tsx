

import React, { useEffect, useState } from "react";
import CategoryCards from "../../components/CategoryCards";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { UserReducerInitialState } from "../../types/reducer-types";
import api from "../../api";
const server = import.meta.env.VITE_SERVER;

const MenuPage = () => {
  
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 4;


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
  };

  console.log('data:',userFavourites);
  

 

  useEffect(() => {
    fetchingFavourites();
  }, [userId]);

  useEffect(() => {
    try {
      api.get(`/category/get`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error while loading categories");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      // If search query is present, fetch products based on search query
      searchProducts(searchQuery);
    } else {
      // Otherwise, fetch products based on selected category and current page
      fetchProducts();
    }
  }, [selectedCategory, currentPage, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, currentPage]);

  const fetchProducts = () => {
    try {
      api
        .get(
          `/product/get?category=${selectedCategory}&page=${currentPage}&limit=${rowsPerPage}`
        )
        .then((res) => {
          if (res.data.success) {
            setProductList(res.data.data);
            setTotalPages(res.data.totalPages);
          }
        });
    } catch (error) {
      toast.error("Error while loading products");
      console.log(error);
    }
  };

  const searchProducts = (query) => {
    try {
      api
        .get(
          `/product/search?q=${query}&page=${currentPage}&limit=${rowsPerPage}`
        )
        .then((res) => {
          if (res.data.success) {
            setProductList(res.data.data);
            setTotalPages(res.data.totalPages);
          }
        });
    } catch (error) {
      toast.error("Error while searching products");
      console.log(error);
    }
  };

  const addToCart = (product) => {
    api
      .post(`/cart/add/${userId}`, { product, quantity: 1 })
      .then((response) => console.log("Product added to cart:", response.data))
      .catch((error) => console.error("Error adding to cart:", error));

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
          imageUrl: `${server}/${product.productImage[0].replace(/ /g, "%20")}`,
        },
      ]);
    }

    toast.success(`${product.productName} added to cart!`);
  };

  


  const selectedCategoryHandler = (name) => {
    setSelectedCategory(name);
    setCurrentPage(1); // Reset to the first page when category changes
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
                    imageUrl={`${server}/${item.categoryImage[0].replace(
                      / /g,
                      "%20"
                    )}`}
                    handler={() => selectedCategoryHandler(item.category)}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        

        <div className="grid grid-cols-4 gap-4">
          {productList.map((item) => (
            <div key={item._id}>
           {/* {
             if(userFavourites.includes(item._id)){

<>
           }

            } */}
              {item.productImage && item.productImage[0] && (
                <>
                  <ProductCard
                    productId={item._id}
                    price={item.price}
                    description={item.Description}
                    name={item.productName}
                    discountPrice={item.discountPrice}
  
                    offerInPercentage={item.offerInPercentage}
                    imageUrl={`${server}/${item.productImage[0].replace(
                      / /g,
                      "%20"
                    )}`}
                    onAddToCart={() => addToCart(item)}

                    // onAddToFavorites={() => addToWishlist(item)}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      

    

      <div className="flex justify-center pt-2 pb-10 ">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === index + 1
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === totalPages
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      
    </div>
  );
};

export default MenuPage;
