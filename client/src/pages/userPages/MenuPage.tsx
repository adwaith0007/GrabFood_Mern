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

const MenuPage = () => {
  // const {data} =useLatestProductsQuery("")

  // const userData = useSelector(selectUser);

  // console.log(userData);

  const [categoryList, setCategoryList] = useState([]);

  const [productList, setProductList] = useState([]);



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

 

  const values = productList;

  console.log(values);

  const addtoCart = () => {};

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
                    handler={addtoCart}
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
                    handler={addtoCart}
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
