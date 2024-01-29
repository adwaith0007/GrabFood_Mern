import React, { useEffect,useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios';
import serverUrl from "../../server";
import CategoryCards from '../../components/CategoryCards';
import ItemCard from '../../components/ItemCard';
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';
import { selectUser } from './../../redux/userSlice';

import s2_1 from "../../assets/s2_1.png";




const MenuPage = () => {

 
  const userData = useSelector(selectUser);

  console.log(userData);
  
  
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/api/admin/category`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("white while loading categories");
      console.log(error);
    }
  }, []);

  const addtoCart=()=>{

  }

  
  return (
    <div className="bg-[#e5d9ca] h-screen ">
         

     <div className="container custom-height flex flex-col justify-center items-center mx-auto  ">

      <CategoryCards/>

     


     


     {/* <div className="flex w-screen flex-wrap">
      {products.map((product, i) => {
        console.log(product);
        return (
          <div key={i}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div> */}

{/* <img src={`http://localhost:5000/Aliquote1.jpg`} alt="" /> */}

{/* {categoryList.map((item, index) => (
   
  <div key={index}>
    
<img src={`http://localhost:5000/${item.categoryImage[0].originalname}`} alt="Category Image"/>

   
    <h2>{item.categoryImage[0] ? item.categoryImage[0].originalname : 'No Image'}</h2>
   
    
    <h3>{item.category}</h3>
  </div>
))} */}


<div className='grid grid-cols-4 gap-4' >





{categoryList.map((item) => (
  <div key={item._id}>
    {item.categoryImage && item.categoryImage[0] && ( <>
      {/* <img src={`http://localhost:5000/${item.categoryImage[0].originalname}`} alt="Category Image"/> */}
      <h1>hi</h1>
    </>
    )}

    <h2>{item.categoryImage && item.categoryImage[0] ? item.categoryImage[0].originalname : 'No Image'}</h2>
    
    <ItemCard  productId="sdf" price={5674} name={item.category} imageUrl={s2_1} handler={addtoCart}  />
    
    <h3>{item.category}</h3>
  </div>
))}

</div>

        </div>
    </div>
  )
}

export default MenuPage