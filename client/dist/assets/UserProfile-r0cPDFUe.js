import{u as x,r as d,j as e,U as b,M as j,v as N,i as p}from"./index-PMf8wB1j.js";const v="https://www.grabfood.life",w=()=>{var u;const{user:n}=x(s=>s.userReducer),o=n._id,[l,m]=d.useState(!1),[a,i]=d.useState({name:"",gender:"",email:"",phoneNumber:"",profileImage:null});d.useEffect(()=>{(async()=>{try{const r=await p.get(`/user/get/${o}`);if(console.log("data:",r.data),r&&r.data){const t=r.data.data;i({name:t.username,gender:t.gender,email:t.email,phoneNumber:t.phone,profileImage:t.profilePicture})}}catch(r){console.error("Error fetching user data:",r)}})()},[o]);const g=()=>{m(!0)},h=async()=>{try{const s=new FormData;s.append("name",a.name),s.append("gender",a.gender),s.append("email",a.email),s.append("phoneNumber",a.phoneNumber),s.append("profileImage",a.profileImage),(await p.put(`/user/edit/${o}`,s,{headers:{"Content-Type":"multipart/form-data"}})).status===200?console.log("User profile updated successfully"):console.error("Error updating user profile"),m(!1)}catch(s){console.error("Error updating user profile:",s)}},c=(s,r)=>{i(s==="profileImage"?{...a,[s]:r[0]}:{...a,[s]:r})},f=`${v}/${(u=a==null?void 0:a.profileImage)==null?void 0:u.replace(/ /g,"%20")}`;return e.jsxs("div",{className:"admin-container",children:[e.jsx(b,{}),e.jsxs("div",{className:"container mx-auto mt-10 p-6 bg-white rounded-md shadow-md",children:[e.jsxs("div",{className:"flex items-center space-x-6",children:[e.jsxs("div",{className:"relative w-20 h-20",children:[e.jsx("img",{src:f||"/default-user-image.jpg",alt:"user",className:"w-full h-full object-cover rounded-full"}),l&&e.jsxs("label",{htmlFor:"profileImage",className:"absolute bottom-0 right-0 cursor-pointer",children:[e.jsx("input",{type:"file",id:"profileImage",accept:"image/*",className:"hidden",onChange:s=>c("profileImage",s.target.files)}),e.jsx("span",{className:"p-1 bg-blue-500 text-white rounded-full",children:"Change Image"})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold text-lg",children:n.name}),e.jsx("div",{className:"text-gray-600",children:n.gender})]})]}),e.jsxs("div",{className:"mt-6",children:[e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("span",{className:"w-6 h-6 mr-2"}),l?e.jsx("input",{type:"email",value:a.email,onChange:s=>c("email",s.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",placeholder:"Email"}):e.jsx("span",{children:a.email})]}),e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("span",{className:"w-6 h-6 mr-2"}),l?e.jsx("input",{type:"tel",value:a.phoneNumber,onChange:s=>c("phoneNumber",s.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",placeholder:"Phone Number"}):e.jsx("span",{children:a.phoneNumber})]})]}),e.jsx("div",{className:"flex items-center justify-between mb-6",children:l?e.jsxs("button",{onClick:h,className:"text-green-500 hover:underline cursor-pointer",children:[e.jsx(N,{size:20,className:"inline-block mb-1"}),"Save"]}):e.jsxs("button",{onClick:g,className:"text-blue-500 hover:underline cursor-pointer",children:[e.jsx(j,{size:20,className:"inline-block mb-1"}),"Edit Profile"]})})]})]})};export{w as default};