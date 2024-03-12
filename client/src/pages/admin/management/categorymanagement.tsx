import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from '../../../api';
const server = import.meta.env.VITE_SERVER;

const defaultImg =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

interface CategoryDetails {
  _id: string;
  category: string;
  categoryImage: { originalname: string }[];
}

const CategoryManagement = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails>({
    _id: "",
    category: "",
    categoryImage: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [updating, setUpdating] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await api.get(
          `/Category/${id}`
        );
        if (response.data.success) {
          setCategoryDetails(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch Category details");
        }
      } catch (error) {
        setError("Error fetching Category details");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  const image = `${server}/${categoryDetails?.categoryImage?.[0]?.replace(/ /g,"%20")}`;

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
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
      formData.append("category", categoryDetails.category);

      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await api.put(
        `/category/update/${categoryDetails._id}`,
        formData
      );

      if (response.data.success) {
        toast.success("Category updated successfully!");
        setCategoryDetails(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to update Category");
      }
    } catch (error) {
      console.error("Error updating Category", error);
      setError("Failed to update Category");
    } finally {
      setUpdating(false);
    }
  };

  const deleteHandler = async (): Promise<void> => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this category?");
    if (confirmDeletion) {
      try {
        const response = await api.delete(
          `/category/delete/${categoryDetails._id}`
        );

        if (response.status === 200) {
          toast.success("Category deleted successfully");
          navigate("/admin/category");
        } else {
          console.error("Error deleting category");
          setError("Failed to delete category");
          toast.error("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category", error);
        setError("Failed to delete category");
        toast.error("Failed to delete category");
      }
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
          <strong>ID - {categoryDetails._id}</strong>
          <img src={image} alt="Category" />
          <p>{categoryDetails.category}</p>
        </section>
        <article>
          <button
            className="product-delete-btn"
            onClick={deleteHandler}
            disabled={updating}
          >
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Category</label>
              <input
                type="text"
                value={categoryDetails?.category}
                onChange={(e) => setCategoryDetails({ ...categoryDetails, category:  e.target.value })}
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
                  className="hidden"
                  onChange={changeImageHandler}
                />
              </div>
            </div>

            {photoFile && <img src={URL.createObjectURL(photoFile)} alt="New Image" />}
            <button type="submit" disabled={updating}>
              Update
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default CategoryManagement;