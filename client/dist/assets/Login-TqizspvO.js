import{b as x,a as f,j as e,L as i,c as g,d as h,e as b,_ as l,f as p}from"./index-SuGLVXXj.js";import{u as j,f as w}from"./formik.esm-nXt70YWu.js";import{a as y,g as v}from"./helper-RyhnrMVj.js";const C=()=>{const n=x(),o=f(),a=j({initialValues:{username:"",password:""},validateOnBlur:!1,validateOnChange:!1,onSubmit:async r=>{const{success:d,verified:c,data:m}=await y({username:r.username,password:r.password});if(d){const{token:t}=m,s=g(t),u={_id:s._id,name:s.name,email:s.email,photo:s.photo,role:s.role,gender:s.gender,token:t};n(h(u)),b.set("token",t,{path:"/",sameSite:"Lax"}),l.success(e.jsx("b",{children:"Login Successfully..."})),o("/")}else c===!1?(n(p(r.username)),await v(r.username),l.error("User is not verified"),console.log("values.username:",r.username),o("/otp")):l.error(e.jsx("b",{children:"Password Not Match!"}))}});return e.jsx("div",{className:"bg-[#e5d9ca] h-[100vh] w-full ",children:e.jsx("div",{className:"container custom-height flex justify-center items-center mx-auto ",children:e.jsxs("div",{className:"flex flex-row w-full h-full flex-wrap  justify-center items-center   p-8 ",children:[e.jsx("div",{className:"  hidden xl:flex w-1/2 ",children:e.jsx("img",{className:" h-[600px]  rounded-l-[10px]  lg:h-[600px] object-cover w-full ",src:w,alt:""})}),e.jsx("div",{className:" flex justify-center    ",children:e.jsxs("div",{className:" w-full px-10 h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]",children:[e.jsx("div",{className:"text-center text-lg font-bold text-[30px] mt-[50px]",children:e.jsx("h1",{children:"Login"})}),e.jsxs("form",{onSubmit:a.handleSubmit,className:"max-w-sm min-w-[280px] mx-auto mt-10 ",children:[e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"username",className:"block mb-2 text-sm font-medium text-gray-900 ",children:"username"}),e.jsx("input",{type:"text",id:"username",name:"username",onChange:a.handleChange,value:a.values.username,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",placeholder:"username"})]}),e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium text-gray-900 ",children:"Your password"}),e.jsx("input",{type:"password",id:"password",name:"password",onChange:a.handleChange,value:a.values.password,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "})]}),e.jsxs("div",{className:"flex flex-row justify-between ",children:[e.jsxs("div",{className:"flex items-start mb-5",children:[e.jsx("div",{className:"flex items-center h-5 ",children:e.jsx("input",{id:"terms",type:"checkbox",value:"",className:"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"})}),e.jsx("label",{htmlFor:"terms",className:"ms-2 text-sm font-medium text-gray-900 ",children:"Remember me"})]}),e.jsx("div",{children:e.jsx(i,{to:"/forgot_password",className:"text-gray-900 hover:underline",children:"Forgot password?"})})]}),e.jsx("div",{className:"flex justify-center w-full mt-5 px-6 ",children:e.jsx("button",{type:"submit",className:"  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-full  sm:w-auto px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Submit"})}),e.jsx("div",{className:"flex justify-center mt-3 ",children:e.jsxs("p",{id:"helper-text-explanation",className:"mt-2 text-sm text-gray-500 dark:text-gray-400",children:["Don’t have an account yet?",e.jsx(i,{to:"/signup",className:"font-medium text-blue-600 hover:underline ",children:"Sign Up"}),"."]})})]})]})})]})})})};export{C as default};
