import React from 'react';

const CartSection = ({ products, cartItems, onAddToCart, onUpdateCart, onDeleteFromCart }) => {
    console.log(products);
    
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-4">Shoping Cart</h2>
      {products.map(product => (
        <div key={product._id} className="mb-4 border p-4 flex justify-between items-center">

            
          <div>
          <img
          src={`http://localhost:5000/${product.productImage[0]?.replace(/ /g, "%20")}`}
          alt={product.name}
        />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => onAddToCart(product._id, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSection;