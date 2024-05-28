import{R as v,r,j as e,u as y,a as N,n as a}from"./index-JMqGIfVs.js";import{o as w}from"./otp-Hz6nkJWk.js";import{g as h,v as T}from"./helper-oaTIlv9B.js";const P=v.memo(({expiryTime:i,visible:c,onExpiry:n})=>{const l=()=>{const s=i-Date.now();if(s<=0)return n(),{minutes:0,seconds:0};const u=Math.floor(s/1e3/60%60),m=Math.floor(s/1e3%60);return{minutes:u<10?`0${u}`:u,seconds:m<10?`0${m}`:m}},[d,o]=r.useState(()=>l());return r.useEffect(()=>{let s;return c?s=setInterval(()=>{o(l())},1e3):clearInterval(s),()=>clearInterval(s)},[c,i,n]),e.jsx("div",{className:"flex justify-center items-center space-x-2",children:c&&e.jsxs("span",{className:"text-xl text-black font-medium",children:[d.minutes,":",d.seconds]})})}),E=()=>{const[i,c]=r.useState(""),[n,l]=r.useState(!0),[d,o]=r.useState(!0),[s,u]=r.useState(Date.now()+6e4),{registeredUsername:m}=y(t=>t.userReducer),f=m,g=N();r.useEffect(()=>{h(f).then(t=>(console.log(t),t?a.success("OTP has been sent to your email! "):a.error("Problem while generating OTP!")))},[f]),r.useEffect(()=>{if(!n)return;const t=setTimeout(()=>{u(Date.now()+6e4)},1e3);return()=>clearTimeout(t)},[n]);const p=t=>{c(t.target.value)};async function b(t){t.preventDefault(),o(!1),l(!1);try{const{status:x}=await T({username:f,code:i});if(x===201)return a.success("Verification Successful! "),g("/login");a.error("Invalid otp. Please try again.")}catch{a.error("Invalid otp. Please try again.")}}function j(){const t=h(f);a.promise(t,{loading:"Sending...",success:e.jsx("b",{children:"OTP has been sent to your email!"}),error:e.jsx("b",{children:"Could not Send it!"})}),t.then(x=>console.log(x)),l(!0),o(!0)}return e.jsx("div",{className:"bg-[#e5d9ca] h-screen w-full ",children:e.jsx("div",{className:"container h-[90%] flex justify-center items-center mx-auto ",children:e.jsxs("div",{className:"flex flex-row w-full h-full flex-wrap  justify-center items-center p-8 ",children:[e.jsx("div",{className:"  hidden xl:flex w-1/2 ",children:e.jsx("img",{className:" h-[600px]  rounded-l-[10px]  lg:h-[600px] object-cover w-full ",src:w,alt:""})}),e.jsx("div",{className:" flex justify-center h-full lg:h-auto   ",children:e.jsxs("div",{className:" w-full px-10 lg:h-[600px] lg:w-[470px] rounded-r-[10px] bg-[#f4eeee]",children:[e.jsx("div",{className:"text-center text-lg font-bold text-[30px] mt-[50px]",children:e.jsx("h1",{children:"OTP Verification"})}),e.jsx("div",{className:"h-[91px] flex flex-col justify-center items-center bg-[#d1edde] w-full rounded-[15px] mt-4 mb-3",children:e.jsx("p",{children:"We’ve sent a verification code to your email"})}),e.jsx(P,{expiryTime:s,visible:d&&n,onExpiry:()=>{l(!1),o(!1)}}),e.jsxs("form",{onSubmit:b,className:"max-w-sm mx-auto mt-3 ",children:[e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 ",children:"Enter OTP"}),e.jsx("input",{type:"number",id:"otp",name:"otp",value:i,onChange:p,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",required:!0})]}),e.jsx("div",{className:"flex justify-center w-full px-6 ",children:e.jsx("button",{type:"submit",className:"text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-14 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Verify"})}),!n&&e.jsx("div",{className:"flex justify-center mt-3 ",children:e.jsxs("p",{className:"mt-2 text-sm text-gray-500 dark:text-gray-400",children:["Didn't receive OTP yet?"," ",e.jsx("button",{type:"button",onClick:j,className:"font-medium  text-blue-600 hover:underline ",children:"Resend OTP"}),"."]})})]})]})})]})})})};export{E as default};
