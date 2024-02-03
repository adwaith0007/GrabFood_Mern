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

// const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
//   return (
//     <div className="flex items-center justify-between p-4 border-b">
//       <div className="flex items-center space-x-4">
//         <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
//         <div>
//           <p className="text-lg font-semibold">{item.name}</p>
//           <p className="text-gray-500">Quantity: {item.quantity}</p>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-2">
//           <button onClick={() => onDecrease(item.id)}>
//             <AiOutlineMinus size={18} className="text-gray-700 cursor-pointer" />
//           </button>
//           <span className="text-lg">{item.quantity}</span>
//           <button onClick={() => onIncrease(item.id)}>
//             <AiOutlinePlus size={18} className="text-gray-700 cursor-pointer" />
//           </button>
//         </div>

//         <p className="text-lg font-semibold">${item.price * item.quantity}</p>
//         <button onClick={() => onRemove(item.id)}>
//           <AiOutlineClose size={20} className="text-red-500 cursor-pointer" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const CartSidebar = ({ cartItems, closeCart, onRemove, onIncrease, onDecrease, onProceedToPayment }) => {
//   const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg">
//       <AiOutlineClose
//         onClick={closeCart}
//         size={30}
//         className="absolute right-4 top-6 cursor-pointer"
//       />

//       <div className="p-4">
//         <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//         {cartItems.map((item) => (
//           <CartItem
//             key={item.id}
//             item={item}
//             onRemove={onRemove}
//             onIncrease={onIncrease}
//             onDecrease={onDecrease}
//           />
//         ))}
//       </div>

//       <div className="flex justify-between items-center p-4 border-t">
//         <p className="text-lg font-semibold">Total:</p>
//         <p className="text-lg font-semibold">${totalAmount}</p>
//       </div>

//       <div className="p-4">
//         <button
//           onClick={onProceedToPayment}
//           className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800"
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };



const MenuPage = () => {
  // const {data} =useLatestProductsQuery("")

  // const userData = useSelector(selectUser);

  // console.log(userData);

  const [categoryList, setCategoryList] = useState([]);

  const [productList, setProductList] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/api/admin/category`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error white while loading categories");
      console.log(error);
    }

    try {
      axios.get(`http://localhost:5000/api/product/`).then((res) => {
        if (res.data.success) {
          setProductList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error white while loading products");
      console.log(error);
    }


   



  }, []);


//   const ProductCard = ({ productId, price, description, name, imageUrl, onAddToCart }) => {
//   return (
//     <div className="border p-4 mb-4">
//       <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-2" />
//       <p className="text-lg font-semibold">{name}</p>
//       <p className="text-gray-500">${price}</p>
//       <button
//         onClick={onAddToCart} // Use the onAddToCart callback when the button is clicked
//         className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };



  // const addToCart = (product) => {
  //   // Check if the product is already in the cart
  //   const existingItem = cartItems.find((item) => item.productId === product._id);

    

  //   if (existingItem) {
  //     // If the product is already in the cart, increase its quantity
  //     const updatedCart = cartItems.map((item) =>
  //       item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
  //     );
  //     setCartItems(updatedCart);
  //   } else {
  //     // If the product is not in the cart, add it with quantity 1
  //     setCartItems([...cartItems, { productId: product._id, quantity: 1 }]);
  //   }

  //   toast.success(`${product.productName} added to cart!`);
  // };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.productId === product._id);
  
    if (existingItem) {
      // If the product is already in the cart, increase its quantity
      const updatedCart = cartItems.map((item) =>
        item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
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
          imageUrl: `http://localhost:5000/${product.productImage[0].originalname.replace(/ /g, "%20")}`,
        },
      ]);
    }
  
    toast.success(`${product.productName} added to cart!`);
  };

 

  // const values = productList;

  // console.log(values);

  const changeCategory = () => {
    console.log("cart");
    
  };


  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
  };
  
  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };
  
  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };
  
  const handleProceedToPayment = () => {
    // Implement logic to handle the payment process
    // For example, you can navigate to a payment page or show a modal
    console.log("Proceeding to payment!");
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
                    imageUrl={`http://localhost:5000/${item.categoryImage[0].originalname}`}
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
                    imageUrl={`http://localhost:5000/${item.productImage[0].originalname.replace(/ /g, "%20")}`}
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
          closeCart={closeCart}
          onRemove={(itemId) => {
            const updatedCart = cartItems.filter((item) => item.id !== itemId);
            setCartItems(updatedCart);
          }}
          onIncrease={(itemId) => {
            const updatedCart = cartItems.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
          }}
          onDecrease={(itemId) => {
            const updatedCart = cartItems.map((item) =>
              item.id === itemId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
            setCartItems(updatedCart);
          }}
          onProceedToPayment={() => {
            // Implement your logic for proceeding to payment
            // This can include routing to a payment page or any other relevant action
            console.log("Proceeding to payment...");
          }}
        />
      )} */}


{cartItems.length > 0 && (
  <CartSidebar
    cartItems={cartItems}
    closeCart={() => setCartItems([])} // Clear the cartItems to close the cart
    onRemove={(productId) => handleRemoveFromCart(productId)}
    onIncrease={(productId) => handleIncreaseQuantity(productId)}
    onDecrease={(productId) => handleDecreaseQuantity(productId)}
    onProceedToPayment={() => handleProceedToPayment()}
  />
)}


        {/* {cartItems.length > 0 && (
          <CartSidebar
            cartItems={cartItems}
            closeCart={() => {}}
            onRemove={() => {}}
            onIncrease={() => {}}
            onDecrease={() => {}}
            onProceedToPayment={() => {}}
          />
        )} */}
        

       

        {/* <div className="grid grid-cols-4 gap-4">
          {productList.map((item) => (
            <div key={item._id}>

              {item.productImage && item.productImage[0] && (
                <>
                  
                  <ProductCard
                    productId={item._id}
                    price={item.price}
                    description={item.Description} 
                    
                    name={item.productName}
                    imageUrl={`http://localhost:5000/${item.productImage[0].originalname.replace(/ /g, "%20")}`}
                    handler={addtoCart}
                  />
                </>
              )}
            </div>
          ))}
        </div> */}


      </div>
    </div>
  );
};

export default MenuPage;
