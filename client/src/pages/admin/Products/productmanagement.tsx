import  { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
// import axios from "axios";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const server = import.meta.env.VITE_SERVER;

import api from '../../../api';

// const defaultImg ="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<any>({});
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const [addOfferBox, setAddOfferBox] = useState<boolean>(false);
  const [offer, setOffer] = useState<number>(0);

  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    try {
      api.get(`/category/get`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error while loading categories");
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/product/${id}`);
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

  console.log(productDetails);
  

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleRemoveExistingImage = async (imageIndex: number) => {
    try {
      const updatedImages = [...productDetails.productImage];
      const removedImage = updatedImages.splice(imageIndex, 1)[0];

      setProductDetails((prevProduct) => ({
        ...prevProduct,
        productImage: updatedImages,
      }));

      const response = await api.delete(`/product/deleteImage/${id}`, {
        data: { imageName: removedImage },
      });

      if (response.data.success) {
        toast.success("Image deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete image");
        setProductDetails((prevProduct) => ({
          ...prevProduct,
          productImage: [...updatedImages, removedImage],
        }));
      }
    } catch (error) {
      console.error("Error deleting image", error);
      toast.error("Failed to delete image");
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("name", productDetails.productName);
      formData.append("price", String(productDetails.price));
      formData.append("category", productDetails.category);
      formData.append("offer", String(offer));

      productDetails.productImage.forEach((image: string) => {
        formData.append("images", image);
      });

      selectedImages.forEach((file: File) => {
        formData.append("images", file);
      });

      const response = await api.put(`/product/update/${id}`, formData);
      console.log(response);
      

      if (response.data.success) {
        setProductDetails(response.data.data.updatedProduct);
        // toast.success("Product updated successfully!");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to update Product");

      }
    } catch (error) {
      toast.error(error.response.data.message)
      
    } finally {
      setUpdating(false);
    }
  };

  const deleteHandler = async (): Promise<void> => {
    try {
      const response = await api.delete(`/product/delete/${id}`);

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
          <strong>ID - {productDetails?._id}</strong>
          {productDetails?.productImage && productDetails.productImage.length > 0 && (
            <div className=" w-full form-group">
              <div className=" w-full grid grid-cols-3 border-2  rounded-xl shadow p-3 gap-4 mt-1">
                {productDetails.productImage.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`${server}/${image}`}
                      alt={`Existing ${index}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedImages.length > 0 && (
            <div className="form-group">
              <div className="grid grid-cols-3 gap-4 mt-1">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
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
          )}
          <p>{productDetails?.productName}</p>
          <h3>₹{productDetails?.price}</h3>
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
                value={productDetails?.productName}
                onChange={(e) => setProductDetails({ ...productDetails, productName: e.target.value })}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                value={productDetails?.price}
                onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
              />
            </div>
            


            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={productDetails?.category}
                onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}


                className="min-w-[180px] w-[20vw] border border-teal-700 rounded-xl p-2 text-sm"
              >
                <option value="">{productDetails?.category}</option>
                {categoryList.map((item, index) => (
                  <option key={index} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full ">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setAddOfferBox(!addOfferBox);
                  }}
                  className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
                >
                  Add Offer
                </button>
              </div>

              {addOfferBox && (
                <div>
                  <input
                    onChange={(e) => setOffer(parseInt(e.target.value, 10))}
                    className="w-52"
                    placeholder="Offen in percentage.."
                    type="number"
                  ></input>
                </div>
              )}
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
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <button type="submit" disabled={updating}>
              Update
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
