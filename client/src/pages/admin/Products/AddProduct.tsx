import { useEffect, useState } from "react";


import toast from "react-hot-toast";
import api from "../../../api";
import ImageCropComponent from "../../../components/admin/ImageCropComponent";

import Lottie from "react-lottie";
import addProductLottie from "../../../assets/lottie/addProduct.json";

import log from '../../../../logger';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    category: "",
    price: "",
    images: [],
  });

  const [categoryList, setCategoryList] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isImageCropModalVisible, setImageCropModalVisible] = useState(false);

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: addProductLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const handleImageChange = async (e) => {
  //   const files = e.target.files;
  //   const newImages = Array.from(files);

  //   setSelectedImages([...selectedImages, ...newImages]);

  //   await setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     images: [...prevProduct.images, ...newImages],
  //   }));

  //   // Log selected images and updated product state
  //   console.log("Selected Images:", newImages);
  //   // console.log("Updated Product State:", {
  //   //   ...product,
  //   //   images: [...product.images, ...newImages], // Ensure images array is updated
  //   // });

  //   console.log(product.images);
  // };

  const handleImageChange = (croppedImageFile: any, index: any) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = croppedImageFile; // Replace original image with cropped image
      return updatedImages;
    });

    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [
        ...prevProduct.images.slice(0, index),
        croppedImageFile,
        ...prevProduct.images.slice(index + 1),
      ],
    }));
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));

    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

   

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("desc", product.desc);
      formData.append("category", product.category);
      formData.append("price", product.price);
      // product.images.forEach((file) => formData.append("images", file));

      // product.images.forEach((file, index) =>{ formData.append(`image_${index}`, file); console.log("Appended file:", file)});

      product.images.forEach((file) => {
        formData.append(`images`, file);
        log.debug("Appended file:", file);
      });

      // product.images.forEach((file) => {
      //   formData.append("images", file);
      //   console.log("Appended file:", file);
      // });

      // Log FormData object just before the request is sent
      log.debug("FormData:", formData);

      const response = await api.post(`/product/add`, formData);

      if (response.data.success) {
        toast.success("Product added");
        // Reset form fields and selected images after successful submission
        setProduct({
          name: "",
          desc: "",
          category: "",
          price: "",
          images: [],
        });
        setSelectedImages([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      {isImageCropModalVisible && (
        <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
      )}
      <div className="">
       
        <main className="product-management">
          <section>
            {!product.category &&
            !selectedImages[0] &&
            !product.name &&
            !product.price &&
            !product.desc ? (
              <div
                className="flex justify-center items-center "
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
              >
                <div>
                  <Lottie options={defaultOptions} height={300} width={400} />
                </div>
              </div>
            ) : (
              <></>
            )}
            {/* Display selected category */}
            {product.category && <p>{product.category}</p>}

            {/* Display selected images */}
            {selectedImages.length > 0 && (
              <div className="form-group">
                <div className="flex flex-col gap-4 mt-1">
                  {selectedImages.length > 0 && (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(selectedImages[0])}
                        alt="Preview 0"
                        className="w-full  object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                        onClick={() => handleRemoveImage(0)}
                      >
                        X
                      </button>
                    </div>
                  )}

                  {selectedImages.length > 1 && (
                    <div className="grid grid-cols-3 gap-4">
                      {selectedImages.slice(1).map((image, index) => (
                        <div key={index + 1} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                            onClick={() => handleRemoveImage(index + 1)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Display product name */}
            {product.name && <p>{product.name}</p>}

            {/* Display product price */}
            {product.price && <h3>₹{product.price}</h3>}

            {/* Display product description */}
            {product.desc && <p>{product.desc}</p>}
          </section>

          <article>
            <form onSubmit={handleFormSubmit}>
              <h2>New Product</h2>
              <div className="form-group">
                <label htmlFor="productName">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  id="productPrice"
                  placeholder="Price"
                  name="price"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDesc">Description</label>
                <input
                  type="text"
                  id="productDesc"
                  placeholder="Description"
                  name="desc"
                  value={product.desc}
                  onChange={(e) =>
                    setProduct({ ...product, desc: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                  className="min-w-[180px] w-[343px] border border-teal-700 rounded-xl p-2 text-sm"
                >
                  <option value="">----Choose options----</option>
                  {categoryList.map((item, index) => (
                    <option key={index} value={item.category}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Photo</label>
                <div className="flex items-center ">
                  {/* <label
                  htmlFor="imageInput"
                  className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
                >
                  Upload Images
                </label> */}
                  <button
                    // id="imageInput"

                    type="button"
                    className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300 "
                    // onChange={handleImageChange}

                    onClick={() => {
                      setImageCropModalVisible(!isImageCropModalVisible);
                    }}
                  >
                    Upload Images
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all duration-300 "
              >
                Create
              </button>

              {isImageCropModalVisible && (
                <div className="">
                  
                  <ImageCropComponent
                    onClose={() => setImageCropModalVisible(false)}
                    // handleSubmit={setImageCropModalVisible}
                    handleImageChange={handleImageChange}
                    aspectRatio={5 / 4}
                    maxImage={4}
                  />
                </div>
              )}
            </form>
          </article>
        </main>
      </div>
    </div>
  );
};

export default AddProduct;
