import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${productId}`)
      .then((res) => {
        if (res.data.success) {
          setProductDetails(res.data.data);
        } else {
          // Handle error
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error)
      });
  }, [productId]);

  const handleAddToCart = () => {
    // Implement logic to add product to cart
    console.log(`Added ${quantity} ${productDetails.productName} to cart`);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="container mx-auto p-8">
      {productDetails && (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Product Images Slider */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <ImageGallery
              items={productDetails.productImage.map((image) => ({
                original: `http://localhost:5000/${image}`,
                thumbnail: `http://localhost:5000/${image}`,
              }))}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{productDetails.productName}</h2>
            <p className="text-gray-700 mb-4">{productDetails.description}</p>
            <p className="text-xl font-bold text-indigo-600 mb-4">₹{productDetails.price}</p>

            {/* Quantity Selection */}
            <div className="mb-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 border rounded-md p-1.5 text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Add to Wishlist
              </button>
            </div>

            {/* Other Features */}
            <div className="flex flex-col gap-2">
              {/* Add other features here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;