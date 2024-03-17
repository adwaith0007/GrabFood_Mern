import React, { useEffect, useState } from "react";
import CategoryCards from "../../components/CategoryCards";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserReducerInitialState } from "../../types/reducer-types";
import api from "../../api";
const server = import.meta.env.VITE_SERVER;

const MenuPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory ] = useState('')
  const rowsPerPage = 1; // Adjust the number of rows per page here

  useEffect(() => {
    try {
      api.get(`/category/get`  ).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error while loading categories");
      console.log(error);
    }

    fetchProducts();
  }, [selectedCategory]); // Fetch products only once on initial render

  const fetchProducts = () => {
    try {
      // api.get(`/product/get?limit=${rowsPerPage}`)

      api.get(`/product/get`+ (selectedCategory ? `?category=${selectedCategory}`: ''))
        .then((res) => {
          if (res.data.success) {
            setProductList(res.data.data);
          }
        });
    } catch (error) {
      toast.error("Error while loading products");
      console.log(error);
    }
  };

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

  const selectedCategoryHandler = (name) => {
    setSelectedCategory(name);
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
              {item.productImage && item.productImage[0] && (
                <>
                  <ProductCard
                    productId={item._id}
                    price={item.price}
                    description={item.Description}
                    name={item.productName}
                    imageUrl={`${server}/${item.productImage[0].replace(
                      / /g,
                      "%20"
                    )}`}
                    onAddToCart={() => addToCart(item)}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
