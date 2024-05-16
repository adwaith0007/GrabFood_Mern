// import  { useState,useEffect } from "react";
// import OTPTimer from "../../components/user/OtpTimer";
// import otpimg from "../../assets/otp.png";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { UserReducerInitialState } from "../../types/reducer-types";
// import { generateOTP, verifyOTP } from "../../helper/helper";

// const Otp = () => {
//   // const [OTP, setOTP] = useState("");
//   const [otpValue, setOtpValue] = useState("");
//   const [timerRunning, setTimerRunning] = useState(true);
//   const [timerVisible, setTimerVisible] = useState(true);
//   const expiryTime = Date.now() + 60000;
//   const { registeredUsername } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );
//   const username = registeredUsername;
//   const navigate = useNavigate();

//   useEffect(() => {
//     generateOTP(username).then((OTP) => {
//       console.log(OTP);
//       if (OTP) return toast.success("OTP has been sent to your email! ");
//       return toast.error("Problem while generating OTP!");
//     });
//   }, [username]);

//   // async function onSubmit(e) {
//   //   e.preventDefault();
//   //   setTimerVisible(false)
//   //   setTimerRunning(false)
//   //   const { status } = await verifyOTP({ username, code: OTP });
//   //   if (status === 201) {
//   //     toast.success("Verification Successful! ");
//   //     return navigate("/");
//   //   } else if (status === 400) {
//   //     toast.error("Invalid OTP! Please check your OTP and try again.");
//   //   } else {
//   //     toast.error("An error occurred while verifying OTP. Please try again later.");
//   //   }
//   // }

//   async function onSubmit(e) {
//     e.preventDefault();
//     setTimerVisible(false);
//     setTimerRunning(false);
//     try {
//       const { status } = await verifyOTP({ username, code: OTP });
//       if (status === 201) {
//         toast.success("Verification Successful! ");
//         return navigate("/");
//       } else {
//         // Handle other status codes
//         toast.error("Invalid otp. Please try again.");
//       }
//     } catch (error) {
//       // Handle network errors or other errors
//       toast.error("Invalid otp. Please try again.");
//     }
//   }

//   function resendOTP() {
//     const sendPromise = generateOTP(username);

//     toast.promise(sendPromise, {
//       loading: "Sending...",
//       success: <b>OTP has been sent to your email!</b>,
//       error: <b>Could not Send it!</b>,
//     });

//     sendPromise.then((OTP) => console.log(OTP));
//     setTimerRunning(true); // Start the timer when Resend OTP is clicked
//     setTimerVisible(true); // Show the timer
//   }

//   return (
//     <div className="bg-[#e5d9ca] h-screen w-full ">
//       <div className="container h-[90%] flex justify-center items-center mx-auto ">
//         <div className="flex flex-row w-full h-full flex-wrap  justify-center items-center p-8 ">
//           <div className="  hidden xl:flex w-1/2 ">
//             <img
//               className=" h-[600px]  rounded-l-[10px]  lg:h-[600px] object-cover w-full "
//               src={otpimg}
//               alt=""
//             />
//           </div>
//           <div className=" flex justify-center    ">
//             <div className=" w-full px-10 lg:h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]">
//               <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
//                 <h1>OTP Verification</h1>
//               </div>
//               <div className="h-[91px] flex flex-col justify-center items-center bg-[#d1edde] w-full rounded-[15px] mt-4 mb-3">
//                 <p>We’ve sent a verification code to your email</p>
//               </div>

//               <OTPTimer
//                   expiryTime={expiryTime}
//                   visible={timerVisible && timerRunning}
//                   onExpiry={() => {
//                     setTimerRunning(false); // Stop the timer when it expires
//                     setTimerVisible(false); // Hide the timer when it expires
//                   }}
//                 />


//               <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-3 ">
//                 <div className="mb-5">
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 "
//                   >
//                     Enter OTP
//                   </label>
//                   <input
//                     type="number"
//                     id="otp"
//                     name="otp"
//                     value={otpValue}
//                     onChange={(e) => setOtpValue(e.target.value)}
//                     // onChange={(e) => setOTP(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-center w-full px-6 ">
//                   <button
//                     type="submit"
//                     className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   >
//                     Verify
//                   </button>
//                 </div>
                
//                 {!timerRunning && (
//                   <div className="flex justify-center mt-3 ">
//                     <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                       Didn't receive OTP yet?{" "}
//                       <button
//                         type="button"
//                         onClick={resendOTP}
//                         className="font-medium  text-blue-600 hover:underline "
//                       >
//                         Resend OTP
//                       </button>
//                       .
//                     </p>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Otp;











import  { useState, useEffect } from "react";
import OTPTimer from "../../components/user/OtpTimer";
import otpimg from "../../assets/otp.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import { generateOTP, verifyOTP } from "../../helper/helper";

const Otp = () => {
  const [otpValue, setOtpValue] = useState("");
  const [timerRunning, setTimerRunning] = useState(true);
  const [timerVisible, setTimerVisible] = useState(true);
  const [expiryTime, setExpiryTime] = useState(Date.now() + 60000); // Initial expiry time
  const { registeredUsername } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const username = registeredUsername;
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success("OTP has been sent to your email! ");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  useEffect(() => {
    if (!timerRunning) return; // Stop setting the expiry time if the timer is stopped

    const timer = setTimeout(() => {
      setExpiryTime(Date.now() + 60000); // Update expiry time every minute
    }, 1000);

    return () => clearTimeout(timer);
  }, [timerRunning]); // Only run this effect when timerRunning changes

  const handleOtpChange = (e) => {
    setOtpValue(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    setTimerVisible(false);
    setTimerRunning(false);
    try {
      const { status } = await verifyOTP({ username, code: otpValue });
      if (status === 201) {
        toast.success("Verification Successful! ");
        return navigate("/");
      } else {
        // Handle other status codes
        toast.error("Invalid otp. Please try again.");
      }
    } catch (error) {
      // Handle network errors or other errors
      toast.error("Invalid otp. Please try again.");
    }
  }

  function resendOTP() {
    const sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "Sending...",
      success: <b>OTP has been sent to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sendPromise.then((OTP) => console.log(OTP));
    setTimerRunning(true); // Start the timer when Resend OTP is clicked
    setTimerVisible(true); // Show the timer
  }

  return (
    <div className="bg-[#e5d9ca] h-screen w-full ">
      <div className="container h-[90%] flex justify-center items-center mx-auto ">
        <div className="flex flex-row w-full h-full flex-wrap  justify-center items-center p-8 ">
          <div className="  hidden xl:flex w-1/2 ">
            <img
              className=" h-[600px]  rounded-l-[10px]  lg:h-[600px] object-cover w-full "
              src={otpimg}
              alt=""
            />
          </div>
          <div className=" flex justify-center h-full lg:h-auto   ">
            <div className=" w-full px-10 lg:h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]">
              <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
                <h1>OTP Verification</h1>
              </div>
              <div className="h-[91px] flex flex-col justify-center items-center bg-[#d1edde] w-full rounded-[15px] mt-4 mb-3">
                <p>We’ve sent a verification code to your email</p>
              </div>

              <OTPTimer
                expiryTime={expiryTime}
                visible={timerVisible && timerRunning}
                onExpiry={() => {
                  setTimerRunning(false); // Stop the timer when it expires
                  setTimerVisible(false); // Hide the timer when it expires
                }}
              />

              <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-3 ">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    id="otp"
                    name="otp"
                    value={otpValue}
                    onChange={handleOtpChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex justify-center w-full px-6 ">
                  <button
                    type="submit"
                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Verify
                  </button>
                </div>

                {!timerRunning && (
                  <div className="flex justify-center mt-3 ">
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Didn't receive OTP yet?{" "}
                      <button
                        type="button"
                        onClick={resendOTP}
                        className="font-medium  text-blue-600 hover:underline "
                      >
                        Resend OTP
                      </button>
                      .
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;