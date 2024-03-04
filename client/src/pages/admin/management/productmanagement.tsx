import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

  const { _id: productId, productName: name, price, category, productImage } = productDetails;
  const image = productImage?.[0]?.replace(/ /g, "%20");
  const imageUrl = image ? `http://localhost:5000/${image}` : defaultImg;

  const [updatedPrice, setUpdatedPrice] = useState<number>(price);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>(imageUrl);
  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [updating, setUpdating] = useState<boolean>(false);

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

      const formData = new FormData();

      // Append the name if it's changed
      if (nameUpdate !== name) {
        formData.append("name", nameUpdate);
      }

      // Append the rest of the fields (if they are changed)
      if (updatedPrice !== price) {
        formData.append("price", String(updatedPrice));
      }

      if (categoryUpdate !== category) {
        formData.append("category", categoryUpdate);
      }

      // Append the photo if it's changed
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await axios.put(`http://localhost:5000/api/product/update/${productId}`, formData);

      if (response.data.success) {
        toast.success("Product updated successfully!");

        // Update only the fields that have changed
        setProductDetails({
          ...productDetails,
          productName: nameUpdate,
          ...(updatedPrice !== price && { price: updatedPrice }),
          ...(categoryUpdate !== category && { category: categoryUpdate }),
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
          <img src={imageUrl} alt="Product" />
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
                placeholder={price.toString()}
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(Number(e.target.value))}
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
            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
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
