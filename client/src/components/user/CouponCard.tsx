import  { useEffect, useState } from "react";
import api from '../../api';

const CouponCard = () => {
    const [couponData, setCouponData] = useState([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await api.get('/coupon/get');
                console.log(response.data.data);
                setCouponData(response.data.data); // Assuming your response data structure is an array of coupons
            } catch (error) {
                console.error(error);
            }
        };

        fetchCoupons();
    }, []);

    const copyCouponCode = (code) => {
        navigator.clipboard.writeText(code);
        // You can add additional UI feedback here if needed
        console.log("Coupon code copied to clipboard:", code);
    };

    const [copiedIndex, setCopiedIndex] = useState(-1); // to keep track of the copied coupon index

    return (
        <div >
            {couponData.length > 0 && (
                couponData.map((coupon, index) => (
                    <div className="container mx-auto   " key={index}>
                        

                        
                        <div className="bg-gradient-to-br mb-5 from-purple-600 to-indigo-600 text-white text-center py-7 px-20 rounded-lg shadow-md relative">
                            <h3 className="text-xl font-semibold mb-4">
                            {coupon.discount}%   {coupon.couponName} 
                            </h3>
                            <div className="flex items-center space-x-2 mb-6">
                                <span
                                    id="cpnCode"
                                    className={`border-dashed border text-white px-4 py-2 rounded-l `}
                                >
                                    {coupon.couponCode} 
                                </span>
                                <span
                                    id="cpnBtn"
                                    className={`  w-40  px-4 py-2 rounded-r cursor-pointer ${copiedIndex === index ? 'bg-black' : 'bg-white  text-purple-600 border-white border '}  `}
                                    onClick={() => {
                                        copyCouponCode(coupon.couponCode);
                                        setCopiedIndex(index);
                                        setTimeout(() => setCopiedIndex(-1), 1500); // Reset copied index after 1.5 seconds
                                    }}
                                >
                                    {copiedIndex === index ? 'Copied' : 'Copy Code'}
                                </span>
                            </div>
                            <p className="text-sm">Valid Till: {coupon.formattedDateTime}</p>
                            <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                            <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
                        </div>
                        
                    </div>
                ))
            )}
        </div>
    );
};

export default CouponCard;
