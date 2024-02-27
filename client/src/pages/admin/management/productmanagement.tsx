import React, { ChangeEvent, useEffect, FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";



const defaultImg =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`);
        if (response.data.success) {
          setProductDetails(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch product details");
        }
      } catch (error) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const {
    _id: productId,
    productName: name,
    price,
    
    category,
    productImage,
  } = productDetails;

  const image = `http://localhost:5000/${productDetails.productImage?.[0]?.originalname.replace(/ /g, "%20")}`

  const [priceUpdate, setPriceUpdate] = useState<number>(price );
 
  const [nameUpdate, setNameUpdate] = useState<string>(name );
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category );
  // const [photoUpdate, setPhotoUpdate] = useState<string>( image );

  // const [photoUpdate, setPhotoUpdate] = useState( image );

  const [photoUpdate, setPhotoUpdate] = useState<string>(productImage?.[0]?.url || defaultImg);

  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [updating, setUpdating] = useState<boolean>(false);
 

  // console.log(`http://localhost:5000/${productDetails.productImage?.[0]?.originalname.replace(/ /g, "%20")}` );
  // console.log(photoUpdate);

  console.log(image);
  
  

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setUpdating(true);

      // Update the product on the server
      const formData = new FormData();
      formData.append("name", nameUpdate);
      formData.append("price", String(priceUpdate));
      formData.append("category", categoryUpdate);
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await axios.put(`http://localhost:5000/api/product/update/${productId}`, formData);

      if (response.data.success) {
        toast.success("Product updated successfully!");
        
        setProductDetails({
          ...productDetails,
          productName: nameUpdate,
          price: priceUpdate,
          category: categoryUpdate,
          productImage: photoFile
            ? [{ originalname: photoFile.name, url: response.data.data.url }]
            : productDetails.productImage,
        });
      } else {
        toast.error(response.data.message || "Failed to update Product");
      }
    } catch (error) {
      console.error("Error updating product", error);
      setError("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  
  const deleteHandler = async (): Promise<void> => {
    
    try {
      
      const response = await axios.delete(`http://localhost:5000/api/product/delete/${productId}`);
  
      if (response.status === 200) {
        
        toast.success("Product deleted successfully");
        navigate("/admin/product");
      } else {
        console.error("Error deleting product");
        setError("Failed to delete product");
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product", error);
      setError("Failed to delete product");
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - {productId}</strong>
          {/* <img src={photoUpdate} alt="Product" /> */}
          <img src={image} alt="Product" />
          <p>{name}</p>
          
          <h3>₹{price}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={deleteHandler} disabled={updating}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder={name}
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder={price}
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            
            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder={category}
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

           


            <div className="form-group">
              <label>Photo</label>
              <div className="flex items-center">
                <label
                  htmlFor="imageInput"
                  className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
                >
                  Upload Images
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={changeImageHandler}
                />
              </div>
            </div>

             {/* {selectedImages.length > 0 && (
              <div className="form-group">
                
                <div className="grid grid-cols-3 gap-4 mt-1">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-md" />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit" disabled={updating}>Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;