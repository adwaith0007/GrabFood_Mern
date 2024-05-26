
import { Link } from "react-router-dom";

const OrderSummarySection = ({  Amount }) => {
  return (
    <div id="summary" className="w-1/4 relative px-8 py-10">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
     

      


      <div className="border-t mt-8 top-[100px] absolute w-[320px] ">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>₹{Amount}</span>
        </div>
        <Link
          to="/checkout"
          className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 px-3 text-sm text-white uppercase w-full"
          >
          Checkout
        </Link>
      </div>
         

    </div>
  );
};

export default OrderSummarySection;
