import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const Demo = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  return (
    <div className="max-w-lg mx-auto my-8">
      <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700">
        Select Multiple Images
      </label>
      <div className="mt-1 flex justify-center items-center space-x-4">
        <label
          htmlFor="imageInput"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Select Images
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="flex flex-wrap mt-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="w-16 h-16 object-cover rounded-md"
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
    </div>
  )
}

export default Demo