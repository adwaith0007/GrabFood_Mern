// import { useState, useEffect } from "react";
// import { MdEdit, MdSave ,MdCancel,MdEmail } from "react-icons/md";
// import { useSelector } from "react-redux";

// import UserSidebar from "../../../components/user/UserSidebar";

// import defimg from "../../../assets/profile.png"

// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user._id;

//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     gender: "",
//     email: "",
//     phoneNumber: "",
//     profileImage: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await api.get(`/user/get/${userId}`);

//         console.log("data:", response.data);

//         // Check if request was successful and response contains data
//         if (response && response.data) {
//           const userDataFromApi = response.data.data;

//           // Update state with fetched user data
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
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData.name);
//       formData.append("gender", userData.gender);
//       formData.append("email", userData.email);
//       formData.append("phoneNumber", userData.phoneNumber);
//       formData.append("profileImage", userData.profileImage);

//       // Perform save operation using axios to update user data on the server
//       const response = await api.put(`/user/edit/${userId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         console.log("User profile updated successfully");
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
//       setUserData({ ...userData, [field]: value[0] });

//     } else {
//       setUserData({ ...userData, [field]: value });
//     }
//   };

//   const image =
//     typeof userData.profileImage === "string"
//       ? `${server}/${userData.profileImage.replace(/ /g, "%20")}`
//       : `${defimg}`;

//   return (
//     <div className="admin-container">
//       <UserSidebar />
//       <div className="container flex flex-col items-center  mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
//         <div className=" flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5 ">
//           <div className="flex flex-col items-center  ">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image || defimg}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               <label htmlFor="profileImage" className=" cursor-pointer">
//                 <input
//                   type="file"
//                   id="profileImage"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) =>
//                     handleInputChange("profileImage", e.target.files)
//                   }
//                 />
//                 <span className="p-1  bg-blue-500 text-white rounded-full">
//                   Change Image
//                 </span>
//               </label>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user.name}</div>

//             </div>
//           </div>

//           <div className="mt-6  flex flex-col justify-center items-center ">
//             <div className="flex items-center mb-4">
//               {/* <MdEmail className=" h-6 mr-2 "></MdEmail> */}
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData.email}</span>
//               )}
//             </div>

//             <div className="flex w-full justify-center items-center mb-4">
//               {/* <span className=" h-6 ">Phone icon SVG</span> */}
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData.phoneNumber}
//                   onChange={(e) =>
//                     handleInputChange("phoneNumber", e.target.value)
//                   }
//                   className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData.phoneNumber}</span>
//               )}
//             </div>

//           </div>

//           <div className="flex items-center justify-between mt-10 ">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex  justify-center items-center gap-[100px]" >
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                 >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>

//                 <button
//                   onClick={()=>setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector } from "react-redux";

// import UserSidebar from "../../../components/user/UserSidebar";

// import defimg from "../../../assets/profile.png";

// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user._id;

//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     gender: "",
//     email: "",
//     phoneNumber: "",
//     profileImage: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await api.get(`/user/get/${userId}`);

//         console.log("data:", response.data);

//         // Check if request was successful and response contains data
//         if (response && response.data) {
//           const userDataFromApi = response.data.data;

//           // Update state with fetched user data
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
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData.name);
//       formData.append("gender", userData.gender);
//       formData.append("email", userData.email);
//       formData.append("phoneNumber", userData.phoneNumber);
//       formData.append("profileImage", userData.profileImage);

//       // Perform save operation using axios to update user data on the server
//       const response = await api.put(`/user/edit/${userId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         console.log("User profile updated successfully");
//         // Update the user data in state with the new image URL
//         setUserData((prevUserData) => ({
//           ...prevUserData,
//           profileImage: response.data.data.profilePicture,
//         }));
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
//       setUserData({ ...userData, [field]: value[0] });
//     } else {
//       setUserData({ ...userData, [field]: value });
//     }
//   };

//   const image =
//     typeof userData.profileImage === "string"
//       ? `${server}/${userData.profileImage.replace(/ /g, "%20")}`
//       : `${defimg}`;

//   return (
//     <div className="admin-container">
//       <UserSidebar />
//       <div className="container flex flex-col items-center  mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
//         <div className=" flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5 ">
//           <div className="flex flex-col items-center  ">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image || defimg}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               <label htmlFor="profileImage" className=" cursor-pointer">
//                 <input
//                   type="file"
//                   id="profileImage"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) =>
//                     handleInputChange("profileImage", e.target.files)
//                   }
//                 />
//                 <span className="p-1  bg-blue-500 text-white rounded-full">
//                   Change Image
//                 </span>
//               </label>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user.name}</div>
//             </div>
//           </div>

//           <div className="mt-6  flex flex-col justify-center items-center ">
//             <div className="flex items-center mb-4">
//               {/* <MdEmail className=" h-6 mr-2 "></MdEmail> */}
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData.email}</span>
//               )}
//             </div>

//             <div className="flex w-full justify-center items-center mb-4">
//               {/* <span className=" h-6 ">Phone icon SVG</span> */}
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData.phoneNumber}
//                   onChange={(e) =>
//                     handleInputChange("phoneNumber", e.target.value)
//                   }
//                   className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData.phoneNumber}</span>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-10 ">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex  justify-center items-center gap-[100px]">
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                 >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>

//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector } from "react-redux";

// import { useDispatch } from "react-redux";
// // import { userExist} from "../../../redux/reducer/useReducer";

// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { userNotExist } from "../../../redux/reducer/useReducer";
// import ImageCropComponent from "../../../components/admin/ImageCropComponent";

// import UserSidebar from "../../../components/user/UserSidebar";

// import defimg from "../../../assets/profile.png";

// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import toast from "react-hot-toast";
// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user?._id;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isEditing, setIsEditing] = useState(false);
//   const [isImageCropModalVisible, setImageCropModalVisible] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     gender: "",
//     email: "",
//     phoneNumber: "",
//     profileImage: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await api.get(`/user/get/${userId}`);

//         console.log("data:", response.data);

//         // Check if request was successful and response contains data
//         if (response && response.data) {
//           const userDataFromApi = response.data.data;

//           // Update state with fetched user data
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
//         toast.error(error.response.data.message)
//       if (error.response.data.message === "User is blocked") {
//         Cookie.remove('token')
//         dispatch(userNotExist())
//         navigate("/login");

//     }
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData?.name);
//       formData.append("gender", userData?.gender);
//       formData.append("email", userData?.email);
//       formData.append("phoneNumber", userData?.phoneNumber);
//       formData.append("profileImage", userData?.profileImage);

//       // Perform save operation using axios to update user data on the server
//       const response = await api.put(`/user/edit/${userId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         console.log("User profile updated successfully");
//         // Update the user data in state with the new image URL
//         setUserData((prevUserData) => ({
//           ...prevUserData,
//           profileImage: response.data.data.profilePicture,
//         }));

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
//       // Handle image selection separately
//       const selectedImage = value[0];
//       // Display the selected image immediately
//       // const imageURL = URL.createObjectURL(selectedImage);
//       setUserData({ ...userData, [field]: selectedImage });
//     } else {
//       setUserData({ ...userData, [field]: value });
//     }
//   };

//   // const handleImageChange = (croppedImageFile: any, index: any) => {
//   //   setSelectedImages((prevImages) => {
//   //     const updatedImages = [...prevImages];
//   //     updatedImages[index] = croppedImageFile; // Replace original image with cropped image
//   //     return updatedImages;
//   //   });

//   //   setUserData((prevProduct) => ({
//   //     ...userData,
//   //     images: [
//   //       ...prevProduct.images.slice(0, index),
//   //       croppedImageFile,
//   //       ...prevProduct.images.slice(index + 1),
//   //     ],
//   //   }));
//   // };

//   const image =
//     typeof userData.profileImage === "string"
//       ? `${server}/${userData.profileImage.replace(/ /g, "%20")}`
//       : `${defimg}`;

//   return (

//     <div className="h-full" >

// {isImageCropModalVisible && (
//         <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
//       )}

//       <div className="container flex flex-col items-center h-full  mx-auto  p-6 bg-white rounded-md shadow-md">
//         <div className=" flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5 ">
//           <div className="flex flex-col items-center  ">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image || defimg}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               // <label htmlFor="profileImage" className=" cursor-pointer">
//               //   <input
//               //     type="file"
//               //     id="profileImage"
//               //     accept="image/*"
//               //     className="hidden"
//               //     onChange={(e) =>
//               //       handleInputChange("profileImage", e.target.files)
//               //     }

//               //   />
//               //   <span className="p-1  bg-blue-500 text-white rounded-full">
//               //     Change Image
//               //   </span>
//               // </label>

//               <button
//               onClick={() => {
//                 setImageCropModalVisible(!isImageCropModalVisible);
//               }}
//               >
//                 Change Image
//               </button>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user?.name}</div>
//             </div>
//           </div>

//           <div className="mt-6  flex flex-col justify-center items-center ">
//             <div className="flex items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData?.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData?.email}</span>
//               )}
//             </div>

//             <div className="flex w-full justify-center items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData?.phoneNumber}
//                   onChange={(e) =>
//                     handleInputChange("phoneNumber", e.target.value)
//                   }
//                   className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData?.phoneNumber}</span>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-10 ">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex  justify-center items-center gap-[100px]">
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                   >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>

//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {isImageCropModalVisible && (
//                 <div className="">

//                   <ImageCropComponent
//                     onClose={() => setImageCropModalVisible(false)}
//                     // handleSubmit={setImageCropModalVisible}
//                     handleImageChange={handleImageChange}
//                     aspectRatio={1 / 1}
//                     maxImage={1}
//                   />
//                 </div>
//               )}

//                   </div>

//   );
// };

// export default UserProfile;

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { userNotExist } from "../../../redux/reducer/useReducer";
// import ImageCropComponent from "../../../components/admin/ImageCropComponent";
// import defimg from "../../../assets/profile.png";
// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import toast from "react-hot-toast";

// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user?._id;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isEditing, setIsEditing] = useState(false);
//   const [isImageCropModalVisible, setImageCropModalVisible] = useState(false);
//   const [croppedImage, setCroppedImage] = useState(null);
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
//         toast.error(error.response.data.message)
//         if (error.response.data.message === "User is blocked") {
//           Cookie.remove('token');
//           dispatch(userNotExist());
//           navigate("/login");
//         }
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
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
//     setCroppedImage(URL.createObjectURL(croppedImageFile));
//   };

//   const image =
//     typeof userData.profileImage === "string"
//       ? `${server}/${userData.profileImage.replace(/ /g, "%20")}`
//       : croppedImage || defimg;

//   return (
//     <div className="h-full">
//       {isImageCropModalVisible && (
//         <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
//       )}
//       <div className="container flex flex-col items-center h-full mx-auto p-6 bg-white rounded-md shadow-md">
//         <div className="flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5">
//           <div className="flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image || defimg}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               <button
//                 onClick={() => setImageCropModalVisible(!isImageCropModalVisible)}
//                 className="p-1 bg-blue-500 text-white rounded-full"
//               >
//                 Change Image
//               </button>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user?.name}</div>
//             </div>
//           </div>
//           <div className="mt-6 flex flex-col justify-center items-center">
//             <div className="flex items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData?.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData?.email}</span>
//               )}
//             </div>
//             <div className="flex w-full justify-center items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData?.phoneNumber}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData?.phoneNumber}</span>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-between mt-10">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex justify-center items-center gap-10">
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                 >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
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

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { userNotExist } from "../../../redux/reducer/useReducer";
// import ImageCropComponent from "../../../components/admin/ImageCropComponent";
// import defimg from "../../../assets/profile.png";
// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import toast from "react-hot-toast";

// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user?._id;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

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
//           Cookie.remove('token');
//           dispatch(userNotExist());
//           navigate("/login");
//         }
//       }
//     };

//     fetchUserData();
//   }, [userId,imageFile]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
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
//     console.log(userData.profileImage)
//   };

//   const image =
//     typeof userData.profileImage === "string"
//       ? `${server}/${userData.profileImage.replace(/ /g, "%20")}`
//       : userData.profileImage || defimg;

//   return (
//     <div className="h-full">
//       {isImageCropModalVisible && (
//         <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
//       )}
//       <div className="container flex flex-col items-center h-full mx-auto p-6 bg-white rounded-md shadow-md">
//         <div className="flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5">
//           <div className="flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               <button
//                 onClick={() => setImageCropModalVisible(!isImageCropModalVisible)}
//                 className="p-1 bg-blue-500 text-white rounded-full"
//               >
//                 Change Image
//               </button>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user?.name}</div>
//             </div>
//           </div>
//           <div className="mt-6 flex flex-col justify-center items-center">
//             <div className="flex items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData?.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData?.email}</span>
//               )}
//             </div>
//             <div className="flex w-full justify-center items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData?.phoneNumber}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData?.phoneNumber}</span>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-between mt-10">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex justify-center items-center gap-10">
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                 >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
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

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { userNotExist } from "../../../redux/reducer/useReducer";
// import ImageCropComponent from "../../../components/admin/ImageCropComponent";
// import defimg from "../../../assets/profile.png";
// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import toast from "react-hot-toast";

// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user?._id;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

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
//           Cookie.remove('token');
//           dispatch(userNotExist());
//           navigate("/login");
//         }
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
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
//     console.log("croppedImageFile:", croppedImageFile);

//     setImageFile(croppedImageFile);
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       profileImage: URL.createObjectURL(croppedImageFile),
//     }));
//   };

//   const image =
//     typeof userData.profileImage === "string"
//       ? `${server}/${userData.profileImage.replace(/ /g, "%20")}`
//       : userData.profileImage || defimg;

//   return (
//     <div className="h-full">
//       {isImageCropModalVisible && (
//         <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
//       )}
//       <div className="container flex flex-col items-center h-full mx-auto p-6 bg-white rounded-md shadow-md">
//         <div className="flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5">
//           <div className="flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               <button
//                 onClick={() => setImageCropModalVisible(!isImageCropModalVisible)}
//                 className="p-1 bg-blue-500 text-white rounded-full"
//               >
//                 Change Image
//               </button>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user?.name}</div>
//             </div>
//           </div>
//           <div className="mt-6 flex flex-col justify-center items-center">
//             <div className="flex items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData?.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData?.email}</span>
//               )}
//             </div>
//             <div className="flex w-full justify-center items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData?.phoneNumber}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData?.phoneNumber}</span>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-between mt-10">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex justify-center items-center gap-10">
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                 >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
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

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { userNotExist } from "../../../redux/reducer/useReducer";
// import ImageCropComponent from "../../../components/admin/ImageCropComponent";
// import defimg from "../../../assets/profile.png";
// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import toast from "react-hot-toast";

// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user?._id;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

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
//           Cookie.remove('token');
//           dispatch(userNotExist());
//           navigate("/login");
//         }
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
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
//     console.log("croppedImageFile:", croppedImageFile);
//     setImageFile(croppedImageFile);
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       profileImage: URL.createObjectURL(croppedImageFile),
//     }));
//   };

//   const image =
//     typeof userData.profileImage === "string"
//       ? userData.profileImage.startsWith('blob:')
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
//           <div className="flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               <button
//                 onClick={() => setImageCropModalVisible(!isImageCropModalVisible)}
//                 className="p-1 bg-blue-500 text-white rounded-full"
//               >
//                 Change Image
//               </button>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user?.name}</div>
//             </div>
//           </div>
//           <div className="mt-6 flex flex-col justify-center items-center">
//             <div className="flex items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData?.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData?.email}</span>
//               )}
//             </div>
//             <div className="flex w-full justify-center items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData?.phoneNumber}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData?.phoneNumber}</span>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-between mt-10">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex justify-center items-center gap-10">
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                 >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
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

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { userNotExist } from "../../../redux/reducer/useReducer";
// import ImageCropComponent from "../../../components/admin/ImageCropComponent";
// import defimg from "../../../assets/profile.png";
// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import toast from "react-hot-toast";

// const server = import.meta.env.VITE_SERVER;

// const UserProfile = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );

//   const userId = user?._id;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

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
//           Cookie.remove('token');
//           dispatch(userNotExist());
//           navigate("/login");
//         }
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     // Adjust the regex to your specific phone number format requirements
//     const phoneNumberRegex = /^[0-9]{10}$/;
//     return phoneNumberRegex.test(phoneNumber);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     if (!validateEmail(userData.email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     if (!validatePhoneNumber(userData.phoneNumber)) {
//       toast.error("Please enter a valid 10-digit phone number.");
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
//     console.log("croppedImageFile:", croppedImageFile);
//     setImageFile(croppedImageFile);
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       profileImage: URL.createObjectURL(croppedImageFile),
//     }));
//   };

//   const image =
//     typeof userData.profileImage === "string"
//       ? userData.profileImage.startsWith('blob:')
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
//           <div className="flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               <button
//                 onClick={() => setImageCropModalVisible(!isImageCropModalVisible)}
//                 className="p-1 bg-blue-500 text-white rounded-full"
//               >
//                 Change Image
//               </button>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user?.name}</div>
//             </div>
//           </div>
//           <div className="mt-6 flex flex-col justify-center items-center">
//             <div className="flex items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData?.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData?.email}</span>
//               )}
//             </div>
//             <div className="flex w-full justify-center items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData?.phoneNumber}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData?.phoneNumber}</span>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-between mt-10">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex justify-center items-center gap-10">
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                 >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
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

// import { useState, useEffect } from "react";
// import { MdEdit, MdSave, MdCancel } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import Cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { userNotExist } from "../../../redux/reducer/useReducer";
// import ImageCropComponent from "../../../components/admin/ImageCropComponent";
// import defimg from "../../../assets/profile.png";
// import api from "../../../api";
// import { UserReducerInitialState } from "../../../types/reducer-types";
// import toast from "react-hot-toast";

// const server = import.meta.env.VITE_SERVER;

// const Loader = () => (
//   <div className="flex justify-center items-center h-full">
//     <div className="loader"></div>
//   </div>
// );

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
//           Cookie.remove('token');
//           dispatch(userNotExist());
//           navigate("/login");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     const phoneNumberRegex = /^[0-9]{10}$/;
//     return phoneNumberRegex.test(phoneNumber);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     if (!validateEmail(userData.email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     if (!validatePhoneNumber(userData.phoneNumber)) {
//       toast.error("Please enter a valid 10-digit phone number.");
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
//       ? userData.profileImage.startsWith('blob:')
//         ? userData.profileImage
//         : `${server}/${userData.profileImage.replace(/ /g, "%20")}`
//       : defimg;

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <div className="h-full">
//       {isImageCropModalVisible && (
//         <div className="bg-gray-500/80 fixed w-full h-screen z-20 top-0 left-0"></div>
//       )}
//       <div className="container flex flex-col items-center h-full mx-auto p-6 bg-white rounded-md shadow-md">
//         <div className="flex flex-col justify-center items-center border-2 rounded-[10px] shadow w-[350px] h-[450px] mt-5">
//           <div className="flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <img
//                 src={image}
//                 alt="user"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//             {isEditing && (
//               <button
//                 onClick={() => setImageCropModalVisible(!isImageCropModalVisible)}
//                 className="p-1 bg-blue-500 text-white rounded-full"
//               >
//                 Change Image
//               </button>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{user?.name}</div>
//             </div>
//           </div>
//           <div className="mt-6 flex flex-col justify-center items-center">
//             <div className="flex items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={userData?.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="Email"
//                 />
//               ) : (
//                 <span>{userData?.email}</span>
//               )}
//             </div>
//             <div className="flex w-full justify-center items-center mb-4">
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   value={userData?.phoneNumber}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//                   placeholder="Phone Number"
//                 />
//               ) : (
//                 <span>{userData?.phoneNumber}</span>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-between mt-10">
//             {!isEditing ? (
//               <button
//                 onClick={handleEditClick}
//                 className="text-blue-500 hover:underline cursor-pointer"
//               >
//                 <MdEdit size={20} className="inline-block mb-1" />
//                 Edit Profile
//               </button>
//             ) : (
//               <div className="flex justify-center items-center gap-10">
//                 <button
//                   onClick={handleSaveClick}
//                   className="text-green-500 hover:underline cursor-pointer"
//                 >
//                   <MdSave size={20} className="inline-block mb-1" />
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="text-red-500 hover:underline cursor-pointer"
//                 >
//                   <MdCancel size={20} className="inline-block mb-1" />
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
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

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchUserData = async () => {
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
    };

    fetchUserData();
  }, [userId]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!validateEmail(userData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(userData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
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
        // const user: any = {
        //   _id: userId,
        //   name: userData?.name,
        //   role: "user",
        //   email: userData?.email,
        //   photo: response.data.data.profilePicture,
        // };
        dispatch(updateUserPhoto(response.data.data.profilePicture));

        // dispatch(userExist(user));
      } else {
        console.error("Error updating user profile");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "profileImage") {
      const selectedImage = value[0];
      setImageFile(selectedImage);
    } else {
      setUserData({ ...userData, [field]: value });
    }
  };

  const handleImageChange = (croppedImageFile) => {
    setImageFile(croppedImageFile);
    setUserData((prevUserData) => ({
      ...prevUserData,
      profileImage: URL.createObjectURL(croppedImageFile),
    }));
  };

  const image =
    typeof userData.profileImage === "string"
      ? userData.profileImage.startsWith("blob:")
        ? userData.profileImage
        : `${server}/${userData.profileImage.replace(/ /g, "%20")}`
      : defimg;

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
