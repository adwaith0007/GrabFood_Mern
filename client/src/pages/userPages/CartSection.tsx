
// import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// import api from '../../api';
const server = import.meta.env.VITE_SERVER;

const CartSection = ({
  products,
  onIncrease,
  onDecrease,
  onDeleteFromCart,
}) => {
  console.log(products);

  return (
    <div className="w-full" >
      
      {products.map((product) => (
        <div
          key={product._id}
          
        >
          {/* <div>
            <img
              src={`http://localhost:5000/${product.productImage[0]?.replace(
                / /g,
                "%20"
              )}`}
              alt={product.name}
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>₹{product.price.toFixed(2)}</p>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => onAddToCart(product._id, 1)}
            >
              Add to Cart
            </button>
          </div> */}




          <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div className="flex w-2/5">
            <div className="w-24">
             

              <img className="h-24 w-24"
              src={`${server}/${product.productImage[0]?.replace(
                / /g,
                "%20"
              )}`}
              alt={product.name}
            />

            </div>
            <div className="flex flex-col justify-center ml-4 flex-grow">
              <span className="font-bold text-sm mb-5">{product.productName}</span>
              {/* <span className="text-red-500 text-xs">Apple</span> */}

              <button className="font-semibold hover:text-red-500 text-gray-500 text-xs w-fit " onClick={() => onDeleteFromCart(product)}>
              Remove
              </button>
             
            </div>
          </div>
              
            

          <div className="flex justify-center w-1/5">

          <button onClick={() => onDecrease(product)}>
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
            </button>

            <input className="mx-2 border text-center w-10" type="text" value={product.quantity}/>


            <button  onClick={() => onIncrease(product)}>

            {/* <AiOutlinePlus size={18} className="text-gray-700 cursor-pointer" /> */}
            <svg className="fill-current text-gray-600 w-3  " viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </button>

          </div>

              
 
                  <span className="text-center w-1/5 font-semibold text-sm">₹{product.price.toFixed(2)}</span>
          <span className="text-center w-1/5 font-semibold text-sm">₹{product.quantity * product.price}</span>
               
        </div>




        </div>


        


      ))}



      
    </div>
  );
};

export default CartSection;
