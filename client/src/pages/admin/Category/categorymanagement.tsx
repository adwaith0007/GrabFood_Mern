import  { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
// import axios from "axios";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
const server = import.meta.env.VITE_SERVER;

// const defaultImg =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

interface CategoryDetails {
  _id: string;
  category: string;
  categoryImage: string[];
  deleted: boolean;
}

const CategoryManagement = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails>();
  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [addOfferBox, setAddOfferBox] = useState<boolean>(false);
  const [offer, setOffer] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await api.get(`/Category/${id}`);
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

  const image = `${server}/${categoryDetails?.categoryImage?.[0]?.replace(
    / /g,
    "%20"
  )}`;

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
    }
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("category", categoryDetails?.category || "");
      formData.append("offer", String(offer));
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const categoryId = categoryDetails?._id;

      console.log("Updating category with ID:", categoryId);

      const response = await api.put(
        `/category/update/${categoryId}`,
        formData
      );
      const responseData = response.data;

      console.log("Response from backend:", responseData);

      if (responseData.success) {
        toast.success("Category updated successfully!");
        setCategoryDetails(responseData.data);
      } else {
        toast.error(responseData.message || "Failed to update Category");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update Category. Please try again later.");
      }
    } finally {
      setUpdating(false); // Set updating state to false after request completes
    }
  };

  const handleSoftDelete = async (): Promise<void> => {
    try {
      const response = await api.put(
        `/category/softDelete/${categoryDetails._id}`
      );
      if (response.data.success) {
        const updatedCategory = {
          ...categoryDetails,
          deleted: !categoryDetails.deleted,
        };
        setCategoryDetails(updatedCategory);
        // toast.success(`Category ${updatedCategory.deleted ? 'soft ' : ''}deleted successfully`);
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

  const deleteHandler = async (): Promise<void> => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this category?"
    );
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
          <strong>ID - {categoryDetails?._id}</strong>
          <img src={image} alt="Category" />
          <p>{categoryDetails?.category}</p>
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
                onChange={(e) =>
                  setCategoryDetails({
                    ...categoryDetails,
                    category: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group flex gap-2 ">
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
              <div className="flex items-center">
                <button
                  className={`px-2 py-1 cursor-pointer ${
                    categoryDetails?.deleted
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={handleSoftDelete}
                >
                  {categoryDetails?.deleted ? "Undo Deleted" : "Soft Delete"}
                </button>
              </div>
            </div>
            {photoFile && (
              <img src={URL.createObjectURL(photoFile)} alt="New Image" />
            )}

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
