




import {  FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api";
import ImageCropComponent from "../../../components/admin/ImageCropComponent";

const server = import.meta.env.VITE_SERVER;

interface CategoryDetails {
  _id: string;
  category: string;
  categoryImage: string[];
  deleted: boolean;
}

const CategoryManagement = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | null>(null);
  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [addOfferBox, setAddOfferBox] = useState<boolean>(false);
  const [offer, setOffer] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [isImageCropModalVisible, setImageCropModalVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await api.get(`/Category/${id}`);
        if (response.data.success) {
          setCategoryDetails(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch category details");
        }
      } catch (error) {
        setError("Error fetching category details");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  const image = `${server}/${categoryDetails?.categoryImage?.[0]?.replace(/ /g, "%20")}`;

  const handleImageChange = (croppedImageFile: File) => {
    setPhotoFile(croppedImageFile);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!categoryDetails) return;
    setUpdating(true);
    try {
      if (categoryDetails.category.trim().length < 5) {
        toast.error("Category name should contain a minimum of 5 letters");
        return;
      }

      const containsNumbers = /\d/.test(categoryDetails.category);
      if (containsNumbers) {
        toast.error("Category name should not contain numbers");
        return;
      }

      const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
      if (specialChars.test(categoryDetails.category)) {
        toast.error("Category name should not contain special characters");
        return;
      }

      const formData = new FormData();
      formData.append("category", categoryDetails.category);
      formData.append("offer", String(offer));
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await api.put(`/category/update/${categoryDetails._id}`, formData);
      const responseData = response.data;

      if (responseData.success) {
        toast.success("Category updated successfully!");
        setCategoryDetails(responseData.data);
        navigate("/admin/category");
      } else {
        toast.error(responseData.message || "Failed to update category");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update category. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const handleSoftDelete = async (): Promise<void> => {
    if (!categoryDetails) return;
    try {
      const response = await api.put(`/category/softDelete/${categoryDetails._id}`);
      if (response.data.success) {
        setCategoryDetails((prevDetails) => prevDetails ? { ...prevDetails, deleted: !prevDetails.deleted } : prevDetails);
        toast.success(`Category ${categoryDetails.deleted ? "restored" : "soft deleted"} successfully`);
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const deleteHandler = async (): Promise<void> => {
    if (!categoryDetails) return;
    const confirmDeletion = window.confirm("Are you sure you want to delete this category?");
    if (confirmDeletion) {
      try {
        const response = await api.delete(`/category/delete/${categoryDetails._id}`);
        if (response.status === 200) {
          toast.success("Category deleted successfully");
          navigate("/admin/category");
        } else {
          toast.error("Failed to delete category");
        }
      } catch (error) {
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
    <main className="product-management">
      {isImageCropModalVisible && (
        <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
      )}
      <section>
        <strong>ID - {categoryDetails?._id}</strong>
        <img src={image} alt="Category" />
        <p>{categoryDetails?.category}</p>
      </section>
      <article>
        <button className="product-delete-btn" onClick={deleteHandler} disabled={updating}>
          <FaTrash />
        </button>
        <form onSubmit={submitHandler}>
          <h2>Manage</h2>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={categoryDetails?.category || ""}
              onChange={(e) =>
                setCategoryDetails((prevDetails) => prevDetails ? { ...prevDetails, category: e.target.value } : prevDetails)
              }
            />
          </div>
          <div className="form-group flex gap-2">
            <label>Photo</label>
            <div className="flex items-center">
              <button
                type="button"
                className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
                onClick={() => setImageCropModalVisible(true)}
              >
                Upload Images
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className={`px-2 py-1 cursor-pointer ${categoryDetails?.deleted ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                onClick={handleSoftDelete}
                disabled={updating}
              >
                {categoryDetails?.deleted ? "Undo Deleted" : "Soft Delete"}
              </button>
            </div>
          </div>
          {photoFile && <img src={URL.createObjectURL(photoFile)} alt="New Image" />}

          <div className="flex w-full">
            <div>
              <button
                type="button"
                onClick={() => setAddOfferBox(!addOfferBox)}
                className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
              >
                Add Offer
              </button>
            </div>

            {addOfferBox && (
              <div>
                <input
                  type="number"
                  className="w-52"
                  placeholder="Offer in percentage..."
                  onChange={(e) => setOffer(parseInt(e.target.value, 10))}
                />
              </div>
            )}
          </div>

          <button type="submit" disabled={updating}>
            Update
          </button>
        </form>
      </article>

      {isImageCropModalVisible && (
        <div className="">
          <ImageCropComponent
            onClose={() => setImageCropModalVisible(false)}
            handleImageChange={handleImageChange}
            aspectRatio={5 / 4}
            maxImage={1}
          />
        </div>
      )}
    </main>
  );
};

export default CategoryManagement;