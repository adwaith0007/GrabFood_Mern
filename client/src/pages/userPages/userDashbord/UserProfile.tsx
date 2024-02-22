// import React from "react";

// import { BiMaleFemale } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import { FaRegBell } from "react-icons/fa";
// import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
// // import AdminSidebar from "../../components/admin/AdminSidebar";
// import { BarChart, DoughnutChart } from "../../../components/admin/Charts";
// import Table from "../../../components/admin/DashboardTable";
// import data from "../../../assets/data.json";

// const userImg =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

import UserSidebar from "../../../components/user/UserSidebar";

import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdEdit, MdSave } from "react-icons/md";

import { UserReducerInitialState } from '../../../types/reducer-types';
import { useSelector } from 'react-redux';



const UserProfile = () => {

  const { user} = useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "JohnDoe",
    gender: "Male",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    // Add more fields as needed
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Perform save operation to update user data on the server
    // You can add API calls or use state management libraries (e.g., Redux) for this purpose
  };

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };
  return (
    <div className="admin-container">
      <UserSidebar />

      <div className="w-full ">
        
      <div className="container mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">User Profile</h2>
        {!isEditing ? (
          <button
            onClick={handleEditClick}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            <MdEdit size={20} className="inline-block mb-1" />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSaveClick}
            className="text-green-500 hover:underline cursor-pointer"
          >
            <MdSave size={20} className="inline-block mb-1" />
            Save
          </button>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative w-20 h-20">
          <img
            src={user.photo}
            alt="user"
            className="w-full h-full object-cover rounded-full"
          />
          {isEditing && (
            <label htmlFor="profileImage" className="absolute bottom-0 right-0 cursor-pointer">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleInputChange('profileImage', e.target.files[0])}
              />
              <span className="p-1 bg-blue-500 text-white rounded-full">
                Change Image
              </span>
            </label>
          )}
        </div>
        <div>
          <div className="font-semibold text-lg">{user.name}</div>
          <div className="text-gray-600">{user.gender}</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-4">
          <span className="w-6 h-6 mr-2">
            <svg
              className="w-full h-full text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Email icon SVG */}
            </svg>
          </span>
          {isEditing ? (
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Email"
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        <div className="flex items-center mb-4">
          <span className="w-6 h-6 mr-2">
            <svg
              className="w-full h-full text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Phone icon SVG */}
            </svg>
          </span>
          {isEditing ? (
            <input
              type="tel"
              value={userData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Phone Number"
            />
          ) : (
            <span>{userData.phoneNumber}</span>
          )}
        </div>

        {/* Add more user details here */}
      </div>
    </div>

        
      </div>

      

      
    </div>
  );
};



export default UserProfile;
