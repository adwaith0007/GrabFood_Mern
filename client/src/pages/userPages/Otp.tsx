import  { useEffect, useState } from "react";

import otpimg from "../../assets/otp.png";
import {  useNavigate } from "react-router-dom";
import { toast}  from "react-hot-toast";
// import { useFormik } from "formik";

import { useSelector } from 'react-redux';

import { UserReducerInitialState } from '../../types/reducer-types';


import { generateOTP,verifyOTP} from "../../helper/helper";

const Otp = () => {
  
  const [OTP,setOTP]=useState("")

  const {registeredUsername } = useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer);

  const username = registeredUsername

  

  // const username = useSelector(selectUser);

  const navigate = useNavigate();

  console.log(username);
  
  
  useEffect(()=>{

    generateOTP(username).then((OTP)=>{
      console.log(OTP);
      if(OTP) return toast.success('OTP has been send to your email! ');
      return toast.error('Problem while generating OTP!')
    })



  },[username]);

  async function onSubmit(e){
    e.preventDefault();
   const {status} = await verifyOTP({username,code:OTP})
   if(status===201){
    toast.success('Verify Successfuly! ')
    return navigate('/')
   }
   return toast.error('Wrong OTP! Check email again!')
  }

  function resendOTP (){
    const sendPromise = generateOTP(username);

    toast.promise(sendPromise,{
      loading:'Sending...',
      success: <b>OTP has been send to your email!</b>,
      error:<b>Could not Send it!</b>
    })

    sendPromise.then(OTP=>console.log(OTP));
    

  }



  return (                                                        
    <div className="bg-[#e5d9ca] h-screen w-full ">
     

      <div className="container h-[90%] flex justify-center items-center mx-auto ">
        <div className="flex flex-row w-full h-full flex-wrap  justify-center items-center p-8 " >
          
          
          <div className="  hidden xl:flex w-1/2 ">
            <img
              className=" h-[600px]  rounded-l-[10px]  lg:h-[600px] object-cover w-full "
              
              src={otpimg}
              alt=""
            />
          </div>

          <div className=" flex justify-center    ">
            <div className=" w-full px-10 lg:h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]">
              <div className="text-center text-lg font-bold text-[30px] mt-[50px]">
                <h1>OTP Verification</h1>
              </div>

              <div className="h-[91px] flex flex-col justify-center items-center bg-[#d1edde] w-full rounded-[15px] mt-4" >
                <p>
                We’ve sent a verification code to your email
                                
                </p>
                
              </div>

              

              <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-10 ">
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
                  onChange={(e)=>setOTP(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  
                  required
                />
              </div>

              

             


              

              

              <div className="flex justify-center w-full px-6 ">
                <button
                  type="submit"
                  className="  text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Verify
                </button>
              </div>

              

              <div className="flex justify-center   mt-3 ">
                <p
                  
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  Did’t recive OTP yet? 
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
            </form>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Otp