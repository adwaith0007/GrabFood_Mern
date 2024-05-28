

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import {
//   updateUserPhoto,
//   userNotExist,
// } from "../../../redux/reducer/useReducer";
// import ImageCropComponent from "../../../components/admin/ImageCropComponent";
// import defimg from "../../../assets/profile.png";
// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import toast from "react-hot-toast";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user?._id;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isImageCropModalVisible, setImageCropModalVisible] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [userData, setUserData] = useState({
//     name: "",
//     gender: "",
//     email: "",
//     phoneNumber: "",
//     profileImage: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await api.get(`/user/get/${userId}`);
//         if (response && response.data) {
//           const userDataFromApi = response.data.data;
//           setUserData({
//             name: userDataFromApi.username,
//             gender: userDataFromApi.gender,
//             email: userDataFromApi.email,
//             phoneNumber: userDataFromApi.phone,
//             profileImage: userDataFromApi.profilePicture,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         toast.error(error.response.data.message);
//         if (error.response.data.message === "User is blocked") {
//           Cookie.remove("token");
//           dispatch(userNotExist());
//           navigate("/login");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     console.log("usestate is runing .......")

//     fetchUserData();
//   }, [userId, isEditing]);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // const validatePhoneNumber = (phoneNumber) => {
//   //   const phoneNumberRegex = /^[0-9]{10}$/;
//   //   return phoneNumberRegex.test(phoneNumber);
//   // };

//   const validatePhoneNumber = (phoneNumber) => {
//     const phoneNumberRegex = /^[0-9]{10}$/;
//     const repeatedDigitRegex = /^(\d)\1{9}$/;
  
//     if (!phoneNumberRegex.test(phoneNumber)) {
//       toast.error("Invalid Phone Number. Please enter a 10-digit number without any spaces or special characters.");
//       return false ;
//     }
  
//     if (repeatedDigitRegex.test(phoneNumber)) {
//       toast.error("Invalid Phone Number. Phone number should not contain consecutive identical digits.");
//       return false ;
//     }
  
//     return true;
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     if (!validateEmail(userData.email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     // if (!validatePhoneNumber(userData.phoneNumber)) {
//     //   toast.error("Please enter a valid 10-digit phone number.");
//     //   return;
//     // }

//     if (!validatePhoneNumber(userData.phoneNumber)) {
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", userData?.name);
//       formData.append("gender", userData?.gender);
//       formData.append("email", userData?.email);
//       formData.append("phoneNumber", userData?.phoneNumber);
//       if (imageFile) {
//         formData.append("profileImage", imageFile);
//       }

//       const response = await api.put(`/user/edit/${userId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         console.log("User profile updated successfully");
//         setUserData((prevUserData) => ({
//           ...prevUserData,
//           profileImage: response.data.data.profilePicture,
//         }));
//         // const user: any = {
//         //   _id: userId,
//         //   name: userData?.name,
//         //   role: "user",
//         //   email: userData?.email,
//         //   photo: response.data.data.profilePicture,
//         // };
//         dispatch(updateUserPhoto(response.data.data.profilePicture));

//         // dispatch(userExist(user));
//       } else {
//         console.error("Error updating user profile");
//       }

//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     if (field === "profileImage") {
//       const selectedImage = value[0];
//       setImageFile(selectedImage);
//     } else {
//       setUserData({ ...userData, [field]: value });
//     }
//   };

//   const handleImageChange = (croppedImageFile) => {
//     setImageFile(croppedImageFile);
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       profileImage: URL.createObjectURL(croppedImageFile),
//     }));
//   };

//   const image =
//     typeof userData.profileImage === "string"
//       ? userData.profileImage.startsWith("blob:")
//         ? userData.profileImage
//         : `${server}/${userData.profileImage.replace(/ /g, "%20")}`
//       : defimg;

//   return (
//     <div className="h-full">
//       {isImageCropModalVisible && (
//         <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
//       )}
//       <div className="container flex flex-col items-center h-full mx-auto p-6 bg-white rounded-md shadow-md">
//         <div className="flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5">
//           {isLoading ? (
//             <div className="w-full h-full flex flex-col items-center justify-center p-4">
//               <Skeleton circle={true} height={128} width={128} />
//               <Skeleton height={30} width={200} className="mt-6" />
//               <Skeleton height={20} width={250} className="mt-4" />
//               <Skeleton height={20} width={250} className="mt-2" />
//             </div>
//           ) : (
//             <>
//               <div className="flex flex-col items-center">
//                 <div className="relative w-32 h-32">
//                   <img
//                     src={image}
//                     alt="user"
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 </div>
//                 {isEditing && (
//                   <button
//                     onClick={() =>
//                       setImageCropModalVisible(!isImageCropModalVisible)
//                     }
//                     className="p-1 bg-blue-500 text-white rounded-full"
//                   >
//                     Change Image
//                   </button>
//                 )}
//                 <div>
//                   <div className="font-semibold text-lg">{user?.name}</div>
//                 </div>
//               </div>
//               <div className="mt-6 flex flex-col justify-center items-center">
//                 <div className="flex items-center mb-4">
//                   {isEditing ? (
//                     <input
//                       type="email"
//                       value={userData?.email}
//                       onChange={(e) =>
//                         handleInputChange("email", e.target.value)
//                       }
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                       placeholder="Email"
//                     />
//                   ) : (
//                     <span>{userData?.email}</span>
//                   )}
//                 </div>
//                 <div className="flex w-full justify-center items-center mb-4">
//                   {isEditing ? (
//                     <input
//                       type="tel"
//                       value={userData?.phoneNumber}
//                       onChange={(e) =>
//                         handleInputChange("phoneNumber", e.target.value)
//                       }
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//                       placeholder="Phone Number"
//                     />
//                   ) : (
//                     <span>{userData?.phoneNumber}</span>
//                   )}
//                 </div>
//               </div>
//               <div className="flex items-center justify-between mt-10">
//                 {!isEditing ? (
//                   <button
//                     onClick={handleEditClick}
//                     className="text-blue-500 hover:underline cursor-pointer"
//                   >
//                     <MdEdit size={20} className="inline-block mb-1" />
//                     Edit Profile
//                   </button>
//                 ) : (
//                   <div className="flex justify-center items-center gap-10">
//                     <button
//                       onClick={handleSaveClick}
//                       className="text-green-500 hover:underline cursor-pointer"
//                     >
//                       <MdSave size={20} className="inline-block mb-1" />
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setIsEditing(false)}
//                       className="text-red-500 hover:underline cursor-pointer"
//                     >
//                       <MdCancel size={20} className="inline-block mb-1" />
//                       Cancel
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//       {isImageCropModalVisible && (
//         <ImageCropComponent
//           onClose={() => setImageCropModalVisible(false)}
//           handleImageChange={handleImageChange}
//           aspectRatio={1 / 1}
//           maxImage={1}
//         />
//       )}
//     </div>
//   );
// };

// export default UserProfile;




import { useState, useEffect, useMemo, useCallback } from "react";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  updateUserPhoto,
  userNotExist,
} from "../../../redux/reducer/useReducer";
import ImageCropComponent from "../../../components/admin/ImageCropComponent";
import defimg from "../../../assets/profile.png";
import api from "../../../api";
import { UserReducerInitialState } from "../../../types/reducer-types";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const server = import.meta.env.VITE_SERVER;

const UserProfile = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageCropModalVisible, setImageCropModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
  });

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/user/get/${userId}`);
      if (response && response.data) {
        const userDataFromApi = response.data.data;
        setUserData({
          name: userDataFromApi.username,
          gender: userDataFromApi.gender,
          email: userDataFromApi.email,
          phoneNumber: userDataFromApi.phone,
          profileImage: userDataFromApi.profilePicture,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.response.data.message);
      if (error.response.data.message === "User is blocked") {
        Cookie.remove("token");
        dispatch(userNotExist());
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, navigate, dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format. Please enter a valid email address.");
      return false;
    }

    const [localPart, domain] = email.split("@");
    if (/^\d+$/.test(localPart)) {
      toast.error("Invalid email. Local part of the email cannot be numeric.");
      return false;
    }

    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      toast.error("Invalid email domain. Please enter a valid domain.");
      return false;
    }

    return true;
  }, []);

  const validatePhoneNumber = useCallback((phoneNumber) => {
    const phoneNumberRegex = /^[0-9]{10}$/;
    const repeatedDigitRegex = /^(\d)\1{9}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
      toast.error(
        "Invalid Phone Number. Please enter a 10-digit number without any spaces or special characters."
      );
      return false;
    }

    if (repeatedDigitRegex.test(phoneNumber)) {
      toast.error(
        "Invalid Phone Number. Phone number should not contain consecutive identical digits."
      );
      return false;
    }

    return true;
  }, []);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSaveClick = useCallback(async () => {
    

    if (!validateEmail(userData.email)) {
      return;
    }

    if (!validatePhoneNumber(userData.phoneNumber)) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", userData?.name);
      formData.append("gender", userData?.gender);
      formData.append("email", userData?.email);
      formData.append("phoneNumber", userData?.phoneNumber);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await api.put(`/user/edit/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("User profile updated successfully");
        setUserData((prevUserData) => ({
          ...prevUserData,
          profileImage: response.data.data.profilePicture,
        }));
        dispatch(updateUserPhoto(response.data.data.profilePicture));
      } else {
        console.error("Error updating user profile");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  }, [userData, imageFile, userId, validateEmail, validatePhoneNumber, dispatch]);

  const handleInputChange = useCallback((field, value) => {
    if (field === "profileImage") {
      const selectedImage = value[0];
      setImageFile(selectedImage);
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: value,
      }));
    }
  }, []);

  const handleImageChange = useCallback((croppedImageFile) => {
    setImageFile(croppedImageFile);
    setUserData((prevUserData) => ({
      ...prevUserData,
      profileImage: URL.createObjectURL(croppedImageFile),
    }));
  }, []);

  const image = useMemo(() => {
    return typeof userData.profileImage === "string"
      ? userData.profileImage.startsWith("blob:")
        ? userData.profileImage
        : `${server}/${userData.profileImage.replace(/ /g, "%20")}`
      : defimg;
  }, [userData.profileImage]);

  return (
    <div className="h-full">
      {isImageCropModalVisible && (
        <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
      )}
      <div className="container flex flex-col items-center h-full mx-auto p-6 bg-white rounded-md shadow-md">
        <div className="flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <Skeleton circle={true} height={128} width={128} />
              <Skeleton height={30} width={200} className="mt-6" />
              <Skeleton height={20} width={250} className="mt-4" />
              <Skeleton height={20} width={250} className="mt-2" />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <img
                    src={image}
                    alt="user"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {isEditing && (
                  <button
                    onClick={() =>
                      setImageCropModalVisible(!isImageCropModalVisible)
                    }
                    className="p-1 bg-blue-500 text-white rounded-full"
                  >
                    Change Image
                  </button>
                )}
                <div>
                  <div className="font-semibold text-lg">{user?.name}</div>
                </div>
              </div>
              <div className="mt-6 flex flex-col justify-center items-center">
                <div className="flex items-center mb-4">
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData?.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Email"
                    />
                  ) : (
                    <span>{userData?.email}</span>
                  )}
                </div>
                <div className="flex w-full justify-center items-center mb-4">
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData?.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                      placeholder="Phone Number"
                    />
                  ) : (
                    <span>{userData?.phoneNumber}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-10">
                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    <MdEdit size={20} className="inline-block mb-1" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex justify-center items-center gap-10">
                    <button
                      onClick={handleSaveClick}
                      className="text-green-500 hover:underline cursor-pointer"
                    >
                      <MdSave size={20} className="inline-block mb-1" />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      <MdCancel size={20} className="inline-block mb-1" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {isImageCropModalVisible && (
        <ImageCropComponent
          onClose={() => setImageCropModalVisible(false)}
          handleImageChange={handleImageChange}
          aspectRatio={1 / 1}
          maxImage={1}
        />
      )}
    </div>
  );
};

export default UserProfile;