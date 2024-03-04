import React, { ChangeEvent, useEffect, FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const defaultImg =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

interface CategoryDetails {
  _id: string;
  category: string;
  categoryImage: { originalname: string }[];
}

const CategoryManagement = () => {
  const { id } = useParams<{ id: string }>();
  const [CategoryDetails, setCategoryDetails] = useState<CategoryDetails>({
    _id: "",
    category: "",
    categoryImage: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/Category/${id}`
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

  const { _id: categoryId, category, categoryImage } = CategoryDetails;

  const image = `http://localhost:5000/${CategoryDetails.categoryImage?.[0]?.replace(/ /g,"%20")}`;
 
  console.log(categoryImage);

  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  // const [photoUpdate, setPhotoUpdate] = useState<string>( image );

  // const [photoUpdate, setPhotoUpdate] = useState( image );

  const [photoUpdate, setPhotoUpdate] = useState<string>(
    image || defaultImg
  );

  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [updating, setUpdating] = useState<boolean>(false);

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

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      setUpdating(true);

      // Update the Category on the server
      const formData = new FormData();
      formData.append("category", categoryUpdate);
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await axios.put(
        `http://localhost:5000/api/category/update/${categoryId}`,
        formData
      );

      if (response.data.success) {
        toast.success("Category updated successfully!");
        // Update local state if needed
        setCategoryDetails((prevCategoryDetails) => ({
          ...prevCategoryDetails,
          category: categoryUpdate,
          // Update image only if a new image is uploaded
          categoryImage: photoFile
            ? [{ originalname: photoFile.name, url: response.data.data.url }]
            : prevCategoryDetails.categoryImage,
        }));
      } else {
        toast.error(response.data.message || "Failed to update Category");
      }

      // setCategory(categoryUpdate);
      // setPhoto(photoUpdate);
    } catch (error) {
      console.error("Error updating Category", error);
      setError("Failed to update Category");
    } finally {
      setUpdating(false);
    }
  };

  const deleteHandler = async (): Promise<void> => {
    try {
      const response = await await axios.delete(
        `http://localhost:5000/api/category/delete/${categoryId}`
      );

      if (response.status === 200) {
        toast.success("category deleted successfully");
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
          <strong>ID - {categoryId}</strong>
          {/* <img src={photoUpdate} alt="Category" /> */}
          <img src={image} alt="Category" />
          <p>{category}</p>
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
