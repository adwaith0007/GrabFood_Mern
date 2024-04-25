import  { useState, useEffect } from "react";
import { MdEdit, MdSave } from "react-icons/md";
import { useSelector } from 'react-redux';

import UserSidebar from "../../../components/user/UserSidebar";

import api from '../../../api';
import { UserReducerInitialState } from "../../../types/reducer-types";
const server = import.meta.env.VITE_SERVER;

const UserProfile = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user._id;
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    email: '',
    phoneNumber: '',
    profileImage: null,
    
  });

  useEffect(() => {
    
    const fetchUserData = async () => {
        try {
           

            const response = await api.get(`/user/get/${userId}`);
            
            console.log( 'data:', response.data);
            

            // Check if request was successful and response contains data
            if (response && response.data) {
                const userDataFromApi = response.data.data;

                // Update state with fetched user data
                setUserData({
                    name: userDataFromApi.username,
                    gender: userDataFromApi.gender,
                    email: userDataFromApi.email,
                    phoneNumber: userDataFromApi.phone,
                    profileImage:userDataFromApi.profilePicture,
                    
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            
        }
    };

    
    fetchUserData();
}, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('gender', userData.gender);
      formData.append('email', userData.email);
      formData.append('phoneNumber', userData.phoneNumber);
      formData.append('profileImage', userData.profileImage);

      // Perform save operation using axios to update user data on the server
      const response = await api.put(`/user/edit/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        
        console.log('User profile updated successfully');
      } else {
        console.error('Error updating user profile');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleInputChange = (field, value) => {
    
    if (field === 'profileImage') {
      setUserData({ ...userData, [field]: value[0] });
    } else {
      
      setUserData({ ...userData, [field]: value });
    }
  };

  const image = `${server}/${userData?.profileImage?.replace(/ /g, "%20")}`;

  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="container mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <div className="flex items-center space-x-6">
          <div className="relative w-20 h-20">
            <img
              src={ image || '/default-user-image.jpg'}
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
                  onChange={(e) => handleInputChange('profileImage', e.target.files)}
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
            <span className="w-6 h-6 mr-2">{/* Email icon SVG */}</span>
            {isEditing ? (
              <input
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Email"
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>

          <div className="flex items-center mb-4">
            <span className="w-6 h-6 mr-2">{/* Phone icon SVG */}</span>
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

        <div className="flex items-center justify-between mb-6">
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
      </div>
    </div>
  );
};

export default UserProfile;
